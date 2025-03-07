import Link from "next/link";
import { Bell, Menu, Wallet2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "./nav-links";
import React from "react";
import ConnectWallet from "./connect-wallet";
import { useWallet } from "@meshsdk/react";
import UserDropDown from "./user-drop-down";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();

  return (
    <div className="grid h-[calc(100vh-64px)] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Wallet2 className="h-6 w-6" />
              <span className="">Multi-Sig Wallet</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={`/wallet${link.path}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  {React.createElement(link.icon, { className: "h-4 w-4" })}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-64px)] flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Wallet2 className="h-6 w-6" />
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    href={`/wallet${link.path}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                  >
                    {React.createElement(link.icon, { className: "h-5 w-5" })}
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          {!connected ? <ConnectWallet /> : <UserDropDown />}
        </header>
        <main className="flex h-full flex-1 flex-col gap-4 overflow-y-auto p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
