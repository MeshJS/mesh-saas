import LayoutPage from "@/components/layouts/page";
import Metatags from "@/components/site/metatags";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage pageTitle="Authentication" sideNav="auth">
      <Metatags title="Authentication" />
      {children}
    </LayoutPage>
  );
}
