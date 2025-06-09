"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const HighlightedNavLink = ({ href, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={`${navigationMenuTriggerStyle()} 
            ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
      >
        {children}
      </NavigationMenuLink>
    </Link>
  );
};

export const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="bg-background mx-auto bg-shadow sticky top-0 z-10 pt-4">
      <div className="flex md:justify-start justify-between items-center">
        <div className="flex flex-row mx-4 items-center">
          <div className="w-[20px] h-[20px] relative mr-1">
            <Image
              src="/site-logo.svg"
              alt="Green checkmark for logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex text-2xl font-bold text-primary whitespace-nowrap">
            <Link href="/">CRUST-bench</Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <HighlightedNavLink href={item.href}>
                    {item.label}
                  </HighlightedNavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <Menu size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={`w-full ${
                      pathname === item.href ? "font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="my-4 w-full" />
    </nav>
  );
};
