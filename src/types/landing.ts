export type LandingSection = {
    id: string;
    landing_page_id: string;
    section_key: string;
    section_type: string;
    title: string | null;
    subtitle: string | null;
    body: string | null;
    image_url: string | null;
    button_text: string | null;
    sort_order: number;
    is_active: boolean;
    metadata: Record<string, any>;
  };
  
  export type LandingPage = {
    id: string;
    slug: string;
    brand_name: string;
    title: string;
    description: string | null;
    hero_image_url: string | null;
    whatsapp_group_id: string | null;
    is_active: boolean;
    landing_sections: LandingSection[];
  };