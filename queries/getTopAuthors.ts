import fetchHelper from './fetchHelper'

function getAuthorsQuery({ church, preset }) {
  // Variables declaration
  let variablesList: string[] = []
  let bookFilter: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (preset !== 'none') {
    variablesList.push('$preset: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }
  if (preset !== 'none') {
    filterList.push(
      '{ books: { genre: { _icontains: $preset } } }',
    )
    bookFilter.push(
      '(filter: { genre: { _icontains: $preset } })',
    )
  }

  // Building the query
  let baseQuery = `
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        filter: {
          books_func: {
            count: {
              _gt: 1
            }
          }
          ${churchList}
          _and: [
            ${filterList.join(', ')}
          ]
        }
      ) {
        id
        name
        images(limit: 1) {
          directus_files_id {
            id
            width
            height
            description
          }
        }
       books
        ${bookFilter}
         {
        title
       }
      }
    }
  `
  return baseQuery
}

export const getTopAuthors = async ({
  church = 'all',
  preset = 'none',
}) => {
  const query = getAuthorsQuery({ church, preset })

  const res = await fetchHelper({
    query,
    variables: { church, preset },
  })
  return res.data.saints
}
