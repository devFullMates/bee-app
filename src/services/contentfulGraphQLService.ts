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
    notifyEmails: { [productId: string]: string[] }; // Update here
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
    notifyEmails: { [productId: string]: string[] }; // Update here
  }
  
  
  interface ProductCollection {
    items: ProductItem[];
  }
  
  interface GraphQLResponse {
    productCollection: ProductCollection;
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
      notifyEmails
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
      notifyEmails: item.notifyEmails || {},
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};



const UPDATE_PRODUCT_EMAILS_MUTATION = gql`
  mutation updateProductEmails($id: String!, $notifyEmails: JSON) {
    productUpdate(id: $id, data: { notifyEmails: $notifyEmails }) {
      sys {
        id
      }
      notifyEmails
    }
  }
`;

export const updateProductEmails = async (
  productId: string,
  notifyEmails: { [productId: string]: string[] }
): Promise<void> => {
  try {
    await client.request(UPDATE_PRODUCT_EMAILS_MUTATION, {
      id: productId,
      notifyEmails, // Pass as JSON object
    });
  } catch (error) {
    console.error('Error updating product emails:', error);
  }
};
