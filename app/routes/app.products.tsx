import {useEffect, useState, useRef} from "react";
import {Product, PageInfo, ProductsApiResponse} from "../types/product.types";
import {ProductStockFilterType, ProductStockFilter, DirectionType} from "../types/filters.types";
import {getStockStatus} from "../utils/inventory";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProductStockFilter>(ProductStockFilterType.ALL);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  });

  const tableRef = useRef<any>(null);

  const fetchProducts = async (
    filterType: ProductStockFilter,
    cursor?: string,
    direction?: DirectionType,
  ) => {
    setLoading(true);

    const params = new URLSearchParams();

    if (filterType !== ProductStockFilterType.ALL) {
      params.append("status", filterType);
    }

    if (cursor && direction) {
      params.append("cursor", cursor);
      params.append("direction", direction);
    }

    const queryString = params.toString();
    const url = `/api/products${queryString ? '?' + queryString : ''}`;

    const response = await fetch(url);
    const data: ProductsApiResponse = await response.json();

    setProducts(data.products);
    setPageInfo(data.pageInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(filter);
  }, [filter]);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const handleNextPage = () => {
      if (pageInfo.hasNextPage) {
        fetchProducts(filter, pageInfo.endCursor, DirectionType.NEXT);
      }
    };

    const handlePreviousPage = () => {
      if (pageInfo.hasPreviousPage) {
        fetchProducts(filter, pageInfo.startCursor, DirectionType.PREVIOUS);
      }
    };

    // not sure about this part, if it's okay, didn't manage to find info on shopify docs whether it need this.
    table.addEventListener("nextpage", handleNextPage);
    table.addEventListener("previouspage", handlePreviousPage);

    return () => {
      table.removeEventListener("nextpage", handleNextPage);
      table.removeEventListener("previouspage", handlePreviousPage);
    };
  }, [filter, pageInfo]);

  return (
    <s-page heading="Inventory Management">
      <s-section padding="none">
        <s-table
          ref={tableRef}
          paginate={true}
          loading={loading}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
        >
          <s-stack slot="filters" direction="inline" gap="small">
            <s-clickable-chip
              onClick={() => setFilter(ProductStockFilterType.ALL)}
              pressed={filter === ProductStockFilterType.ALL}
              color={filter === ProductStockFilterType.ALL ? "subdued" : "base"}
            >
              All Products
            </s-clickable-chip>
            <s-clickable-chip
              onClick={() => setFilter(ProductStockFilterType.LOW)}
              pressed={filter === ProductStockFilterType.LOW}
              color={filter === ProductStockFilterType.LOW ? "subdued" : "base"}
            >
              Low Stock
            </s-clickable-chip>
            <s-clickable-chip
              onClick={() => setFilter(ProductStockFilterType.OUT)}
              pressed={filter === ProductStockFilterType.OUT}
              color={filter === ProductStockFilterType.OUT ? "subdued" : "base"}
            >
              Out of Stock
            </s-clickable-chip>
          </s-stack>


          <s-table-header-row>
            <s-table-header>Image</s-table-header>
            <s-table-header>Product</s-table-header>
            <s-table-header format="numeric">Price</s-table-header>
            <s-table-header format="numeric">Total Inventory</s-table-header>
            <s-table-header>Status</s-table-header>
            <s-table-header>Variants</s-table-header>
          </s-table-header-row>

          <s-table-body>
            {!loading && products.length === 0 ? (
              <s-table-row>
                <s-table-cell>
                  <s-box padding="small">
                    <s-text alignment="center" tone="subdued">
                      No products found
                    </s-text>
                  </s-box>
                </s-table-cell>
              </s-table-row>
            ) : (
              products.map((product) => (
                <s-table-row key={product.id} hoverable>
                  <s-table-cell>
                    {product.featuredImage ? (
                      <s-thumbnail
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        size="small"
                      />
                    ) : (
                      <s-thumbnail size="small"/>
                    )}
                  </s-table-cell>

                  <s-table-cell>
                    <s-link href={`shopify://admin/products/${product.id.replace('gid://shopify/Product/', '')}`}>
                      {product.title}
                    </s-link>
                  </s-table-cell>

                  <s-table-cell>
                    {product.price} {product.currencyCode}
                  </s-table-cell>

                  <s-table-cell>
                    {product.totalInventory}
                  </s-table-cell>

                  <s-table-cell>
                    <s-badge tone={getStockStatus(product.totalInventory).tone}>
                      {getStockStatus(product.totalInventory).status}
                    </s-badge>
                  </s-table-cell>

                  {/* I generated this part with claude code ai */}
                  <s-table-cell>
                    <s-tooltip id={`variants-${product.id}`}>
                      {product.variants.map((variant, index) => (
                        `${variant.title}: ${variant.inventoryQuantity}${index < product.variants.length - 1 ? '\n' : ''}`
                      )).join('')}
                    </s-tooltip>
                    <s-icon interestFor={`variants-${product.id}`} type="question-circle" color="subdued"/>
                  </s-table-cell>
                </s-table-row>
              ))
            )}
          </s-table-body>
        </s-table>
      </s-section>
    </s-page>
  );
}
