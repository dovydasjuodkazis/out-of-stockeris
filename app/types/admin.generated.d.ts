/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type GetProductsWithInventoryQueryVariables = AdminTypes.Exact<{
  query?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  first?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  after?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
  last?: AdminTypes.InputMaybe<AdminTypes.Scalars['Int']['input']>;
  before?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type GetProductsWithInventoryQuery = { products: { edges: Array<(
      Pick<AdminTypes.ProductEdge, 'cursor'>
      & { node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'totalInventory'>
        & { featuredImage?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'url' | 'altText'>>, priceRangeV2: { minVariantPrice: Pick<AdminTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'title' | 'inventoryQuantity'> }> } }
      ) }
    )>, pageInfo: Pick<AdminTypes.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'> } };

interface GeneratedQueryTypes {
  "#graphql\n  query GetProductsWithInventory(\n    $query: String,\n    $first: Int,\n    $after: String,\n    $last: Int,\n    $before: String\n  ) {\n    products(query: $query, first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          totalInventory\n          featuredImage {\n            url\n            altText\n          }\n          priceRangeV2 {\n            minVariantPrice {\n              amount\n              currencyCode\n            }\n          }\n          variants(first: 100) {\n            edges {\n              node {\n                id\n                title\n                inventoryQuantity\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": {return: GetProductsWithInventoryQuery, variables: GetProductsWithInventoryQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
