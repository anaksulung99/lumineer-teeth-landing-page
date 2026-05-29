"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,  
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/landing", label: "Landing Page" },
  { href: "/admin/rotator", label: "WA Rotator" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/theme", label: "Theme" },
  { href: "/admin/builder", label: "Builder" },
];

export function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid gap-6 text-lg font-medium">
          <h2 className="text-xl font-bold">Menu</h2>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
