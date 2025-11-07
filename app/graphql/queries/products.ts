export const GET_PRODUCTS_WITH_INVENTORY = `
  query GetProductsWithInventory(
    $query: String,
    $first: Int,
    $after: String,
    $last: Int,
    $before: String
  ) {
    products(query: $query, first: $first, after: $after, last: $last, before: $before) {
      edges {
        cursor
        node {
          id
          title
          totalInventory
          featuredImage {
            url
            altText
          }
          priceRangeV2 {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
