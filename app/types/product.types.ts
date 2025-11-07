export interface FeaturedImage {
  url: string;
  altText: string | null;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Variant {
  id: string;
  title: string;
  inventoryQuantity: number;
}

export interface Product {
  id: string;
  title: string;
  totalInventory: number;
  featuredImage: FeaturedImage | null;
  price: string;
  currencyCode: string;
  variants: Variant[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  totalInventory: number;
  featuredImage: FeaturedImage | null;
  priceRangeV2: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ProductsGraphQLResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct;
        cursor: string;
      }>;
      pageInfo: PageInfo;
    };
  };
}

export interface ProductsApiResponse {
  success: boolean;
  products: Product[];
  count: number;
  filter: string;
  pageInfo: PageInfo;
}
