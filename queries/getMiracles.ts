import fetchHelper from './fetchHelper'

function getMiraclesQuery(
  church,
  category,
  miraclesPreset,
) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (category !== 'none') {
    variablesList.push('$category: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }
  if (category !== 'none') {
    filterList.push(
      '{ time_period: { _icontains: $category } }',
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
  category = 'none',
  miraclesPreset = 'none',
  // sort = 'date-asc',
}) => {
  const query = getMiraclesQuery(
    church,
    category,
    miraclesPreset,
  )
  const variables = { category, church, miraclesPreset }

  const response = await fetchHelper({ variables, query })

  return response?.data?.miracles
}
