import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutPage pageTitle="Development Tools" sideNav="dev">
      <Metatags title="Development Tools" />
      {children}
    </LayoutPage>
  );
}
