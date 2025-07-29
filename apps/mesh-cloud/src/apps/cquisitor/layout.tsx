import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function CquisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Cquisitor" sideNav="cquisitor">
      <Metatags title="Cquisitor" />
      {children}
    </LayoutPage>
  );
}
