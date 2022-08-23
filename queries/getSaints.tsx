import { request, gql } from 'graphql-request';

const query = gql`
  query {
    saint {
      id
      name
      summary
      biography
      birth_date
      death_date
      birth_location
      death_location
      photos {
        directus_files_id {
          id
        }
      }
    }
  }
`;

export const getSaints = async () => {
  const { saint } = await request(
    'https://4hi7oa87.directus.app/graphql',
    query
  );
  return saint;
};
