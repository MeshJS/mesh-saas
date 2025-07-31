import { Logo } from "@/components/layouts/logo";
import { NAV } from "@/data/nav";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Logo />
        <span className="sr-only">Mesh SaaS</span>
      </Link>
      {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

// if selected
{
  /* <Link
href="#"
className="text-foreground transition-colors hover:text-foreground"
>
Settings
</Link> */
}
