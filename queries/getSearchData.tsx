import { request } from 'graphql-request'
import { Saint } from '../types/types'

type Response = {
  saints: Saint[]
}

function getSaintsQuery(church) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  // Filter construction
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }

  // Building the query
  let baseQuery = `
    query getSaint${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        filter: {
          ${churchList}
        }
      ) {
        id
        slug
        name
        categories
        birth_year
        death_year
        images {
          directus_files_id {
            id
          }
        }
      }
    }
  `

  return baseQuery
}

export const getSearchData = async (
  church = 'all',
) => {
  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    getSaintsQuery(church),
    {
      church,
    },
  )
  return saints
}