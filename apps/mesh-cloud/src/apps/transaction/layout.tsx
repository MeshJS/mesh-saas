import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Transaction APIs" sideNav="transaction">
      <Metatags title="Transaction APIs" />
      {children}
    </LayoutPage>
  );
}
