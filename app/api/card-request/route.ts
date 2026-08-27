import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCelebrity, generateCardCode } from "@/lib/celebrities";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fanName = String(body.fanName || "").trim();
    const fanEmail = String(body.fanEmail || "").trim().toLowerCase();
    const slug = String(body.slug || "").trim();

    if (!fanName || !fanEmail || !slug) {
      return NextResponse.json(
        { error: "Name, email, and celebrity are required." },
        { status: 400 }
      );
    }

    const celebrity = getCelebrity(slug);
    if (!celebrity) {
      return NextResponse.json({ error: "Celebrity not found." }, { status: 404 });
    }

    const cardCode = generateCardCode(slug);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      const supabase = createClient(url, key);

      // Prefer slug-based insert so seed IDs do not need to be UUIDs
      const { error } = await supabase.from("card_requests").insert({
        celebrity_slug: slug,
        celebrity_name: celebrity.name,
        fan_name: fanName,
        fan_email: fanEmail,
        card_code: cardCode,
        status: "issued",
      });

      // Non-fatal if table not migrated yet — still return card
      if (error) {
        console.warn("Supabase insert warning:", error.message);
      }
    }

    return NextResponse.json({
      ok: true,
      card: {
        fanName,
        fanEmail,
        celebrityName: celebrity.name,
        celebritySlug: slug,
        category: celebrity.category,
        cardCode,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
