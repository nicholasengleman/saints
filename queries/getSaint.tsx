import { request, gql } from 'graphql-request'

type Photo = {
  directus_files_id: {
    id: string
  }
}

type Book = {
  author: string
  title: string
  link: string
  pages: number
  book_cover: {
    id: string
  }
}

type Quote = {
  text: string
  topics: string[]
}

type Church = {
  name: string
  website: string
  image: {
    id: string
  }
  city: string
  country: string
}

type Saint = {
  id: string
  name: string
  summary: string
  biography: string
  birth_date: string
  death_date: string
  birth_location: string
  death_location: string
  categories: string[]
  photos: Photo[]
  books: Book[]
  quotes: Quote[]
  churches: Church[]
}

type Response = {
  saints_by_id: Saint
}

const query = gql`
  query getSaint($id: ID!) {
    saints_by_id(id: $id) {
      id
      name
      summary
      biography
      birth_date
      death_date
      birth_location
      death_location
      categories
      photos {
        directus_files_id {
          id
        }
      }
      books {
        author
        title
        link
        pages
        book_cover {
          id
        }
      }
      quotes {
        text
        topics
      }
      churches {
        name
        website
        image {
          id
        }
        city
        country
      }
    }
  }
`

export const getSaint = async (id?: string) => {
  const { saints_by_id } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
    { id },
  )
  return saints_by_id
}
