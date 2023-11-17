import {
  QueryClient,
  useQuery,
  dehydrate,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import Head from 'next/head'
import { getNav } from '../../queries/getNav'
import { getSaints } from '../../queries/getSaints'
import { getSearchData } from '../../queries/getSearchData'
import { getSaintFilters } from '../../queries/getSaintFilters'
import SaintSummary from '../../components/saint/SaintSummary/SaintSummary'
import Page from '../../components/page/Page/Page'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../hooks/useBreakPoints'
import Hero from '../../components/saint/Hero/Hero'
import useCookie from '../../hooks/useCookie'

export const config = {
  runtime: 'experimental-edge',
}

const Saints = () => {
  useCookie()
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const filter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'
  const saintPreset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'
  const sort = Array.isArray(router.query.sort)
    ? router.query.sort[0]
    : router.query.sort || 'created-newest'

  const { data, isError, isFetching } = useQuery(
    ['saints', church, filter, saintPreset, sort],
    () => getSaints({ church, filter, saintPreset, sort }),
    {
      initialData: [],
    },
  )

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () => getSaintFilters(church),
    {
      initialData: {},
    },
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
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

  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
  } = useBreakpoints()

  const getColumnsToRender = () => {
    if (isMobileS || isMobileM) {
      return 1
    }
    if (isMobileL) {
      return 1
    }
    if (isTablet) {
      return 3
    }
    if (isLaptop) {
      return 4
    }
    return 5
  }

  return (
    <>
      <Head>
        <title>
          Browse and discover every Catholic Saint:
          Spiritual Biographies, Teachings, Prayers,
          Miracles, Books, and Quotes
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints`}
        />
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Roman Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious quotes, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <Hero filtersCount={filtersCount} />

        {isFetching ? (
          <p className="status">Fetching Saints...</p>
        ) : isError ? (
          <p className="status">
            Error.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        ) : !isFetching && data?.length ? (
          <div className={styles.saintHome}>
            {data && (
              <Masonry
                breakpointCols={getColumnsToRender()}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {data?.map((saint, i: number) => (
                  <SaintSummary
                    {...saint}
                    key={i}
                    transitionName={`saint-${i}`}
                    priority={i < 8 ? true : false}
                  />
                ))}
              </Masonry>
            )}
          </div>
        ) : (
          <p className="status">
            No saints found.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        )}
      </Page>
    </>
  )
}

export async function getServerSideProps(context) {
  // Get the cookie from the request headers
  const cookie = context.req.headers.cookie
  const filter = context.query.filter || 'none'
  const saintPreset = context.query.preset || 'none'
  const sort = context.query?.sort || 'created-newest'
  let church = 'all'

  if (cookie) {
    const parsedCookie = cookie
      .split('; ')
      .find((row) => row.startsWith('findasaint.com='))
      ?.split('=')[1]

    if (parsedCookie) {
      const data = JSON.parse(
        decodeURIComponent(parsedCookie),
      )
      church = data.church
    }
  }

  // Now use the church value to make the initial data request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
        cacheTime: 60 * 60 * 1000, // 1 hour in milliseconds
      },
    },
  })

  await queryClient.prefetchQuery(
    ['saints', church, filter, saintPreset, sort],
    () => getSaints({ church, filter, saintPreset, sort }),
  )
  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )
  await queryClient.prefetchQuery(['filters', church], () =>
    getSaintFilters(church),
  )
  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Saints
