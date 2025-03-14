import LayoutWithoutSideNav from "@/components/layouts/page/layout-no-side-nav";
import Metatags from "@/components/site/metatags";

export default function TxInspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWithoutSideNav pageTitle="tx-inspector">
      <Metatags title="tx-inspector" />
      {children}
    </LayoutWithoutSideNav>
  );
}
