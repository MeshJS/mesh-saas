import LayoutWithoutSideNav from "@/components/layouts/page/layout-no-side-nav";
import Metatags from "@/components/site/metatags";
import { ReactFlowProvider } from "@xyflow/react";

export default function CquistorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutWithoutSideNav pageTitle="cquistor">
      <Metatags title="cquistor" />
      {children}
    </LayoutWithoutSideNav>
  );
}
