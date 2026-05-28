export function getWhatsappCtaUrl({
    groupId,
    landingPageId,
    source,
  }: {
    groupId?: string | null;
    landingPageId?: string | null;
    source: string;
  }) {
    if (!groupId) return "#";
  
    const params = new URLSearchParams({
      group_id: groupId,
      source,
    });
  
    if (landingPageId) {
      params.set("landing_page_id", landingPageId);
    }
  
    return `/api/whatsapp/rotate?${params.toString()}`;
  }