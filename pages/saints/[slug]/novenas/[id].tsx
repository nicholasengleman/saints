import { useRef, Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import ErrorPage from 'next/error'
import { getSaint } from '../../../../queries/getSaint'
import { getNav } from '../../../../queries/getNav'
import Page from '../../../../components/page/Page/Page'
import ImageMain from '../../../../components/saint/ImageMain/ImageMain'
import Books from '../../../../components/saint/Books/Books'
import RelatedPeople from '../../../../components/saint/SimilarSaints/SimilarSaints'
import { getSearchData } from '../../../../queries/getSearchData'
import NameTag from '../../../../components/saint/NameTag/NameTag'
import TableOfContents from '../../../../components/saint/TableOfContentsText/TableOfContentsText'
import formatDate from '../../../../utils/dates'
import ReadMoreLinks from '../../../../components/saint/ReadMoreLinks/ReadMoreLinks'
import useBreakpoints from '../../../../hooks/useBreakPoints'
import NextPage from '../../../../components/saint/NextPage/NextPage'
import About from '../../../../components/global/About/About'
import styles from '../styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const SaintNovena = (props) => {
  const router = useRouter()
  const refElement = useRef(null)
  const { isLaptopMinus } = useBreakpoints()
  const days = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ]
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'

  const slug = Array.isArray(router?.query?.slug)
    ? router?.query?.slug[0]
    : router?.query?.slug

  const { data = null } = useQuery(
    ['saints', slug],
    () => getSaint(slug),
    {
      initialData: [],
    },
  )

  const novena = data.prayers.find(
    (prayer) => prayer.prayer_slug === router.query.id,
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: [],
    },
  )

  const { data: navData } = useQuery(
    ['nav', church],
    () => getNav({ church }),
    {
      initialData: {},
    },
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
        <title>{`${data?.name}: their biography and life.`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/biography`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover ${data?.name}'s spiritual journey. Explore their quotes, teachings, miracles, legacy, and related books.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <div className={styles.SaintBio}>
          <div className={styles.content}>
            <div className={styles.leftRail}>
              <ImageMain
                image={data?.profile_image}
                name={data?.name}
              />
              <TableOfContents mainRef={refElement} />
            </div>
            <div
              className={styles.main}
              ref={refElement}
            >
              <NameTag
                tags={data?.categories}
                birthYear={data?.birth_year}
                deathYear={data?.death_year}
                header={`${data.name}: ${novena.prayer_title}`}
              />
              <div className={styles.updated}>
                Updated on {formatDate(data?.date_updated)}
              </div>
              {data?.prayers[0].prayers.map((prayer, i) => (
                <Fragment key={i}>
                  <h2 id={`heading-${i + 1}`}>
                    Day {days[i]}
                  </h2>
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                      __html: prayer.prayer_section || '',
                    }}
                  />
                </Fragment>
              ))}

              {data?.books && isLaptopMinus && (
                <Books
                  books={data?.books}
                  inRightRail={false}
                />
              )}
              <NextPage data={data} />
              <ReadMoreLinks
                links={data?.read_more_links}
              />
              <About showImage={false} />
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
  const church = params?.church || 'all'

  const slug = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints', slug], () =>
    getSaint(slug),
  )

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
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

export default SaintNovena