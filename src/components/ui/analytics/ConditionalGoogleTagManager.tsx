"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

export function ConditionalGoogleTagManager({ gtmId }: { gtmId: string }) {
  const pathname = usePathname();

  if (pathname.includes("/admin")) return null;

  return <GoogleTagManager gtmId={gtmId} />;
}
