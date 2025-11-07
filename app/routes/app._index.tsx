export default function AppIndex() {
  return (
    <s-page heading="Dashboard">
      <s-section>
        <s-grid columns="4" gap="medium">
          <s-link href="/app/products">
            <s-card>
              <s-box padding="medium">
                <s-stack direction="inline" gap="medium" alignment="center" distribution="space-between">
                  <s-stack direction="inline" gap="medium" alignment="center">
                    <div style={{ width: '40px', height: '40px' }}>
                      <s-image
                        src="/images/box.png" alt="inventory" />
                    </div>
                    <s-stack gap="none">
                      <s-text fontWeight="semibold">
                        Inventory
                      </s-text>
                      <s-text size="small" tone="subdued">
                        Manage stock levels
                      </s-text>
                    </s-stack>
                  </s-stack>
                  <s-icon name="chevron-right" />
                </s-stack>
              </s-box>
            </s-card>
          </s-link>
        </s-grid>
      </s-section>
    </s-page>
  );
}
