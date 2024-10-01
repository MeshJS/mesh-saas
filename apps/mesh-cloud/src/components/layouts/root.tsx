import Header from "./header";

export default function LayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}
