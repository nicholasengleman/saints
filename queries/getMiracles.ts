import fetchHelper from './fetchHelper'

interface MiraclesResponse {
  data: {
    miracles: any // Replace `any` with the actual type if known
  }
}

function getMiraclesQuery(church, filter, miraclesPreset) {
  // Variables declaration
  let variablesList: string[] = []
  variablesList.push('$limit: Int!')
  variablesList.push('$offset: Int!')

  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (filter !== 'all') {
    variablesList.push('$filter: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }
  if (filter !== 'all') {
    filterList.push(
      '{ time_period: { _icontains: $filter } }',
    )
  }
  // if (saintPreset === 'patron') {
  //   filterList.push(
  //     '{ categories: { _icontains: "Patron Saints" } }',
  //   )
  // }

  // Building the query
  let baseQuery = `
    query getMiracles${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      miracles(
        limit: $limit
        offset: $offset
        filter: {
          _and: [
            ${filterList.join(', ')}
            ${churchList}
          ]
        }
      ) {
       miracles
       saint {
        name
        slug
        categories
        summary
        birth_year
        death_year
        profile_image {
            id
          }
        }
      }
    }
  `

  return baseQuery
}

const parseSort = (sort) => {
  if (sort === 'created-oldest') {
    return 'date_created'
  }
  if (sort === 'created-newest') {
    return '-date_created'
  }
  if (sort === 'died-oldest') {
    return 'death_year'
  }
  if (sort === 'died-newest') {
    return '-death_year'
  }
}

export const getMiracles = async ({
  church = 'all',
  filter = 'all',
  miraclesPreset = 'none',
  // sort = 'date-asc',
  offset,
  limit,
}) => {
  const query = getMiraclesQuery(
    church,
    filter,
    miraclesPreset,
  )
  const variables = {
    filter,
    church,
    miraclesPreset,
    offset,
    limit,
  }

  const response: MiraclesResponse = await fetchHelper({
    variables,
    query,
  })

  return response?.data?.miracles.map((d) => ({
    ...d,
    link: `/saints/${d.saint.slug}/miracles`,
  }))
}
