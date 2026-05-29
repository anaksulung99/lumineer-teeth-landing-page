"use client";

import type { CSSProperties, ReactNode } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

type TrackedWhatsappLinkProps = {
  href: string;
  category: string;
  label: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function TrackedWhatsappLink({
  href,
  category,
  label,
  children,
  className,
  style,
}: TrackedWhatsappLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() =>
        sendGTMEvent({
          event: "whatsapp_cta_click",
          category,
          action: "whatsapp",
          label,
        })
      }
    >
      {children}
    </a>
  );
}
