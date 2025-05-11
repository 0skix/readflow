// app/api/user_books/route.ts
import { NextResponse } from "next/server";
// <-- tutaj zmiana: importujemy klienta serwerowego
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  // getUser() zamiast getSession(), bo zawsze odświeży access token jeśli trzeba
  const { data: { user }, error: authErr } = await supabase.auth.getUser();

  if (authErr || !user) {
    console.error("Unauthorized GET – authErr:", authErr);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("user_books")
    .select("*")
    .order("inserted_at", { ascending: false });

  if (error) {
    console.error("DB error GET:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { book_key, title, author, cover_url, pages } = await req.json();
  const supabase = await createClient();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();

  console.log("user:", user, "authErr:", authErr);
  if (authErr || !user) {
    console.error("Unauthorized POST – authErr:", authErr, "Cookies:", req.headers.get("cookie"));
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("user_books").upsert({
    user_id: user.id,
    book_key,
    title,
    author,
    cover_url,
    pages,
    status: "to_read",
  });

  if (error) {
    console.error("DB error POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  const supabase = await createClient();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();

  if (authErr || !user) {
    console.error("Unauthorized PATCH – authErr:", authErr);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("user_books")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id); // dodatkowe zabezpieczenie: tylko własne wpisy

  if (error) {
    console.error("DB error PATCH:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}


export async function DELETE(req: Request) {
  const { id } = await req.json();
  const supabase = await createClient();
  const { data: { user }, error: authErr } = await supabase.auth.getUser();
  if (authErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }


  const { error } = await supabase
    .from("user_books")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB error DELETE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}