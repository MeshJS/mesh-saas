import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function YaciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Yaci Devnet" sideNav="yaci">
      <Metatags title="Yaci Devnet" />
      {children}
    </LayoutPage>
  );
}
