import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import Page from '../../components/global/Page/Page'
import ImageMain from '../../components/single/ImageMain/ImageMain'
import Quotes from '../../components/single/Quotes/Quotes'
import Bio from '../../components/single/Description/Description'
import Categories from '../../components/single/Categories/Categories'
import Books from '../../components/single/Books/Books'
import ImagesMini from '../../components/single/ImagesMini/ImagesMini'

const SaintBio = () => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

  console.log(data.photos)

  return (
    <Page>
      <S.Saint>
        <div className="header">
          <ImageMain
            imageId={data?.photos[0]?.directus_files_id?.id}
            name={data?.name}
          />
          <div
            className="col"
            style={{ justifyContent: 'space-between' }}
          >
            <div className="summary">{data?.summary}</div>
            <ImagesMini imageIds={data.photos} />
          </div>
        </div>
        <div className="body">
          <div className="quotes">
            <Quotes quotes={data?.quotes} />
            <Categories />
          </div>
          <Bio text={data?.biography} />
          <Books books={data?.books} />
        </div>
      </S.Saint>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps =
  async ({ params }) => {
    const id = Array.isArray(params?.id)
      ? params?.id[0]
      : params?.id

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['saint', id], () =>
      getSaint(id),
    )

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

export default SaintBio
