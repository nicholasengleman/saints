import { gql } from 'graphql-request'
import fetchHelper from './fetchHelper'


const query = gql`
  query {
    quotes {
      id
      text
      author {
        name
      }
    }
  }
`

export const getSayings = async () => {
  const res = await fetchHelper({ query })
  return res.data
}
