import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CatalogClient from "./CatalogClient";

type UserBookKey = string;

export default async function CatalogPage() {
  // Server-side Supabase client
  const supabase = await createClient();
  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  // Get keys of books user already has
  const { data: userBooks, error } = await supabase
    .from<"user_books", { book_key: string }>("user_books")
    .select("book_key");
  if (error) {
    throw new Error(error.message);
  }
  const userBookKeys: UserBookKey[] = userBooks?.map((b) => b.book_key) ?? [];

  // Pass initial keys to client component
  return <CatalogClient initialKeys={userBookKeys} />;
}
