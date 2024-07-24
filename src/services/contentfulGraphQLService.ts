import { GraphQLClient, gql } from 'graphql-request';

interface ProductImage {
    url: string;
    title?: string;
    description?: string;
  }
  
  interface ProductDescription {
    json: any;
  }
  
  interface ProductItem {
    sys: {
      id: string;
    };
    name: string;
    inStock: boolean;
    image: ProductImage;
    description: ProductDescription;
  }
  
  interface ProductCollection {
    items: ProductItem[];
  }
  
  interface GraphQLResponse {
    productCollection: ProductCollection;
  }

export interface Product {
  id: string;
  name: string;
  image: {
    url: string;
    title?: string;
    description?: string;
  };
  description: any;
  isInStock: boolean;
}

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
    throw new Error("Missing Contentful space ID or access token");
  }

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
);

const PRODUCTS_QUERY = gql`
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

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data = await client.request<GraphQLResponse>(PRODUCTS_QUERY);

    return data.productCollection.items.map((item) => ({
      id: item.sys.id,
      name: item.name,
      image: {
        url: item.image.url,
        title: item.image.title,
        description: item.image.description,
      },
      description: item.description,
      isInStock: item.inStock,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
