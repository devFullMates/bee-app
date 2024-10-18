import { GraphQLClient } from 'graphql-request';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID; 
const accessTokenGet = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN_DELIVERY_API;

if (!spaceId || !accessTokenGet) {
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

export default client;
