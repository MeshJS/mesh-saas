import Nav from "./nav";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-50">
      <Nav />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {/* <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            /> */}
            {/* <CardanoWallet /> */}
          </div>
        </form>
      </div>
    </header>
  );
}
