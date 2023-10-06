import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import styles from './styles.module.scss'
import { getSaint } from '../../../queries/getSaint'
import Page from '../../../components/page/Page/Page'
import ImageMain from '../../../components/saint/ImageMain/ImageMain'
import Books from '../../../components/saint/Books/Books'
import RelatedPeople from '../../../components/saint/SimilarSaints/SimilarSaints'
import ErrorPage from 'next/error'
import { getSearchData } from '../../../queries/getSearchData'
import NameTag from '../../../components/saint/NameTag/NameTag'
import TableOfContents from '../../../components/saint/TableOfContentsText/TableOfContentsText'
import { Saint } from '../../../types/types'
import formatDate from '../../../utils/dates'
import {
  fetchAPIQuery,
  APIResponse,
} from '../../../queries/fetchApiQuery'

const SaintBio = (props) => {
  const router = useRouter()
  const refElement = useRef(null)
  const church = router.query.church || 'all'

  const slug = Array.isArray(router?.query?.slug)
    ? router?.query?.slug[0]
    : router?.query?.slug

  const { data = null } = useQuery(['saints', slug], () =>
    getSaint(slug),
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  const { relatedSaints = null } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data?.name,
    birthDate: data?.birth_year,
    deathDate: data?.death_year,
    birthPlace: data?.birth_location,
    deathPlace: data?.death_location,
    description: data?.summary,
  }

  return (
    <>
      <Head>
        <title>{`${data?.name}: their Legacy`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/legacy`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover the legacy of ${data?.name} and their sayings, teachings, miracles, and related books.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page searchData={searchData}>
        <div className={styles.SaintBio}>
          <div className={styles.content}>
            <div className={styles.leftRail}>
              <ImageMain
                images={data?.images}
                name={data?.name}
                limit={1}
              />
              <TableOfContents mainRef={refElement} />
            </div>
            <div
              className={styles.main}
              ref={refElement}
            >
              <NameTag
                name={data?.name}
                tags={data?.categories}
                birthYear={data?.birth_year}
                deathYear={data?.death_year}
              />
              <div className={styles.updated}>
                Updated on {formatDate(data?.date_updated)}
              </div>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{
                  __html: data?.legacy_influence || '',
                }}
              />
            </div>
            <div className={styles.rightRail}>
              {data?.books && (
                <Books
                  books={data?.books}
                  inRightRail={true}
                />
              )}
            </div>
          </div>

          <RelatedPeople data={relatedSaints} />
        </div>
      </Page>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  let relatedSaints: APIResponse = []
  const church = params?.church || 'all'

  const slug = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints', slug], () =>
    getSaint(slug),
  )
  const saintData: Saint = queryClient.getQueryData([
    'saints',
    slug,
  ]) as Saint

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  try {
    const saintsResponse = await fetchAPIQuery(
      `getRelatedSaints?categories=${saintData?.categories.join()}`,
    )
    relatedSaints = saintsResponse || []
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      relatedSaints: relatedSaints
        ?.filter((saint) => saint.slug !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4),
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            saints {
              slug
            }
          }
        `,
      }),
    },
  )

  if (res.ok) {
    const resData = await res.json()

    const paths = resData.data.saints.map((saint) => ({
      params: { slug: saint.slug },
    }))

    return {
      paths,
      fallback: true,
    }
  }
  const error = await res.text()
  console.log(error)
}

export default SaintBio