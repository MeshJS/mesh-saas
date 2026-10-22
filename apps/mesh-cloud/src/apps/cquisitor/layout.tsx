import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";
import { MovedBanner } from "./moved-banner";

export default function CquisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Cquisitor" sideNav="cquisitor">
      <Metatags title="Cquisitor" />
      <MovedBanner />
      {children}
    </LayoutPage>
  );
}
