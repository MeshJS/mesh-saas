import Sidenav from "./sidenav";

export default function LayoutPage({
  children,
  pageTitle,
  sideNav,
}: {
  children: React.ReactNode;
  pageTitle: string;
  sideNav?: string;
}) {
  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">{pageTitle}</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        {sideNav && <Sidenav sideNav={sideNav} />}
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
}
