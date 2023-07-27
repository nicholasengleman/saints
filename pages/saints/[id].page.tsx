import { Space } from '@mantine/core'
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
import ImageMain from '../../components/saints/single/ImageMain/ImageMain'
import Quotes from '../../components/saints/single/Quotes/Quotes'
import Bio from '../../components/saints/single/Description/Description'
import Books from '../../components/saints/single/Books/Books'
import Churches from '../../components/saints/single/Churches/Churches'
import ImagesMini from '../../components/saints/single/ImagesMini/ImagesMini'

const SaintBio = () => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

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
          <Quotes quotes={data?.quotes} />
          <Bio
            text={data?.biography}
            birthDate={data?.birth_date}
            birthLocation={data?.birth_location}
            deathDate={data?.death_date}
            deathLocation={data?.death_location}
          />
          <Books books={data?.books} />
          <Churches />
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
