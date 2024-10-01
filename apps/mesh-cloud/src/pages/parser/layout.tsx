import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function LayoutParser({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Parser" sideNav="parser">
      <Metatags title="Parser" />
      {children}
    </LayoutPage>
  );
}
