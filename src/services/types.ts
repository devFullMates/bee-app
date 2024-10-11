export interface ProductImage {
    url: string;
    title?: string;
    description?: string;
  }
  
  export interface ProductDescription {
    json: any;
  }
  
  export interface ProductItem {
    sys: {
      id: string;
    };
    name: string;
    inStock: boolean;
    image: ProductImage;
    description: ProductDescription;
  }
  
  export interface ProductCollection {
    items: ProductItem[];
  }
  
  export interface GraphQLResponse {
    productCollection: ProductCollection;
  }
  
  export interface Product {
    id: string;
    name: string;
    image: ProductImage;
    description: ProductDescription;
    isInStock: boolean;
  }
  