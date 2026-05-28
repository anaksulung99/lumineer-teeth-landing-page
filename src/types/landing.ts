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
    logo_url: string | null;
    theme: LandingTheme;
    whatsapp_group_id: string | null;
    is_active: boolean;
    landing_sections: LandingSection[];
  };

  export type LandingTheme = {
    primary_color: string;
    secondary_color: string;
    background_color: string;
    font_family: string;
    cta_text: string;
    cta_subtext: string;
  };
  
  export type MediaItem = {
    id: string;
    file_name: string;
    file_url: string;
    file_path: string;
    file_size: number | null;
    mime_type: string | null;
    created_at: string;
  };