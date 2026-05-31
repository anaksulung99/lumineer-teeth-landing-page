import { NextRequest, NextResponse } from "next/server";
import { getNextWhatsappAgent } from "@/lib/whatsapp-rotator";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const groupId = searchParams.get("group_id");
    const landingPageId = searchParams.get("landing_page_id");
    const source = searchParams.get("source") || "landing-page";

    if (!groupId) {
      return NextResponse.json(
        { message: "group_id wajib diisi" },
        { status: 400 },
      );
    }

    const userAgent = req.headers.get("user-agent");
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      null;

    const agent = await getNextWhatsappAgent({
      groupId,
      landingPageId,
      source,
      userAgent,
      ip,
    });

    const message = encodeURIComponent(
      "Halo kak, saya tertarik promo Lumineers Teeth Beli 1 Gratis 1 + Diskon 50%. Apakah masih tersedia?\nnama: \nalamat: ",
    );

    const phone = String(agent.phone).replace(/\D/g, "");
    const waUrl = `https://wa.me/${phone}?text=${message}`;

    return NextResponse.redirect(waUrl, 302);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
