import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const pages = [
  { href: "/", label: "Home", description: "Start here and explore Agent.AI." },
  {
    href: "/about",
    label: "About",
    description: "Learn who we are and how we work.",
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "See plans and choose what fits.",
  },
  {
    href: "/login",
    label: "Login",
    description: "Sign in to your Agent.AI account.",
  },
] as const;

export default function SiteHeader() {
  return (
    <header className="border-b px-6 py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-max min-w-64 gap-1 p-1">
                {pages.map((page) => (
                  <li key={page.href}>
                    <NavigationMenuLink render={<Link href={page.href} />}>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{page.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {page.description}
                        </span>
                      </div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {pages.map((page) => (
            <NavigationMenuItem key={page.href}>
              <NavigationMenuLink
                render={<Link href={page.href} />}
                className={navigationMenuTriggerStyle()}
              >
                {page.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
