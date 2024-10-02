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

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID; // For Vite, environment variables should be prefixed with VITE_ to be exposed to your application
const accessTokenGet = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN_DELIVERY_API; // get
const accessTokenPost = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN_MANAGEMENT; // post

if (!spaceId || !accessTokenGet || !accessTokenPost) {
    throw new Error("Missing Contentful space ID or access token");
  }

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
  {
    headers: {
      Authorization: `Bearer ${accessTokenGet}`,
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

export const registerEmailContentful = async (email: string, productId: string): Promise<void> => {
  const registerEmailContentfulUrl = `https://api.contentful.com/spaces/${spaceId}/environments/master/entries`;

  try {
    const response = await fetch(registerEmailContentfulUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessTokenPost}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Content-Type': 'emailRegistration',
      },
      body: JSON.stringify({
        fields: {
          email: {
            'en-US': email,
          },
          relatedProduct: {
            'en-US': {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: productId,
              },
            },
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create email: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Email created successfully:', data);
  } catch (error) {
    console.error('Error creating email:', error);
  }
};

