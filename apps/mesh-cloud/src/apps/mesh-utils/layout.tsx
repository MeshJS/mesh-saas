import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function MeshUtilsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Mesh Utilities" sideNav="mesh-utils">
      <Metatags title="Mesh Utilities" />
      {children}
    </LayoutPage>
  );
}
