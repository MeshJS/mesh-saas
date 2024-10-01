import { SIDENAV } from "@/data/sidenav";
import Link from "next/link";

export default function Sidenav({ sideNav }: { sideNav: string }) {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {SIDENAV[sideNav] &&
        SIDENAV[sideNav].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
}

// if selected
{
  /* <Link href="#" className="font-semibold text-primary">
        General
      </Link> */
}
