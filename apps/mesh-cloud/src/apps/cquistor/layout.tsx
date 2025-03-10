import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function CquistorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="cquistor" sideNav="cquistor">
      <Metatags title="cquistor" />
      {children}
    </LayoutPage>
  );
}
