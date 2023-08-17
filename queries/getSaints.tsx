import { request, gql } from 'graphql-request'

type Photo = {
  directus_files_id: {
    id: string
    description: string
  }
}

type Book = {
  title: string
}

type Quote = {
  text: string
}

type Church = {
  name: string
}

type Saint = {
  id: string
  slug: string
  name: string
  summary: string
  biography: string
  birth_year: number
  death_year: number
  birth_location: string
  death_location: string
  categories: string[]
  photos: Photo[]
  quotes: Quote[]
  books: Book[]
}

type Response = {
  saints: Saint[]
}

const query = gql`
  query {
    saints {
      id
      slug
      name
      summary
      biography
      categories
      birth_year
      death_year
      birth_location
      death_location
      books {
        title
      }
      quotes {
        text
      }
      photos {
        directus_files_id {
          id
          description
        }
      }
    }
  }
`

export const getSaints = async () => {
  const { saints } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return saints
}
