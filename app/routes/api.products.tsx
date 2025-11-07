import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import type { GetProductsWithInventoryQuery, GetProductsWithInventoryQueryVariables } from "../types/admin.generated";
import { GET_PRODUCTS_WITH_INVENTORY } from "../graphql/queries/products";
import { LOW_STOCK_THRESHOLD, PAGE_SIZE } from "../constants/inventory";
import { buildInventoryQueryFilter } from "../utils/inventory";

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin } = await authenticate.admin(request);

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const cursor = url.searchParams.get("cursor");
  const direction = url.searchParams.get("direction");

  const queryFilter = buildInventoryQueryFilter(status, LOW_STOCK_THRESHOLD);

  const paginationVars: GetProductsWithInventoryQueryVariables = {
    query: queryFilter || null
  };

  if (direction === "next" && cursor) {
    paginationVars.first = PAGE_SIZE;
    paginationVars.after = cursor;
  } else if (direction === "previous" && cursor) {
    paginationVars.last = PAGE_SIZE;
    paginationVars.before = cursor;
  } else {
    paginationVars.first = PAGE_SIZE;
  }

  const response = await admin.graphql(GET_PRODUCTS_WITH_INVENTORY, {
    variables: paginationVars,
  });

  const responseData = await response.json();
  const data = responseData.data as GetProductsWithInventoryQuery;

  const products = data.products.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    totalInventory: edge.node.totalInventory,
    featuredImage: edge.node.featuredImage,
    price: edge.node.priceRangeV2.minVariantPrice.amount,
    currencyCode: edge.node.priceRangeV2.minVariantPrice.currencyCode,
    variants: edge.node.variants.edges.map(v => ({
      id: v.node.id,
      title: v.node.title,
      inventoryQuantity: v.node.inventoryQuantity,
    })),
  }));

  return {
    success: true,
    products,
    count: products.length,
    filter: status || "all",
    pageInfo: data.products.pageInfo,
  };
}
