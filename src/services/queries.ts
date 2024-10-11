import { gql } from 'graphql-request';

export const PRODUCTS_QUERY = gql`
  query {
    productCollection {
      items {
        sys {
          id
        }
        name
        inStock
        image {
          url
          title
          description
        }
        description {
          json
        }
      }
    }
  }
`;
