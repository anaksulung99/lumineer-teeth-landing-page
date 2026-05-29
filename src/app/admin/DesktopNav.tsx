import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/landing", label: "Landing Page" },
  { href: "/admin/rotator", label: "WA Rotator" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/theme", label: "Theme" },
  { href: "/admin/builder", label: "Builder" },
];

export function DesktopNav() {
  return (
    <div className="hidden items-center gap-5 font-bold md:flex">
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
  );
}
