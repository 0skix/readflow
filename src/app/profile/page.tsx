import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  // Inicjalizujemy klienta Supabase po stronie serwera
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Jeśli brak sesji, przekierowujemy na /login
  if (!session) redirect("/login");

  // Pobieramy książki użytkownika
  const { data: books, error } = await supabase
    .from("user_books")
    .select("*")
    .order("inserted_at", { ascending: false });
  if (error) throw new Error(error.message);

  // Przekazujemy wstępne dane do client component
  return (
    <main className="min-h-[100vh] bg-neutral">
      <ProfileClient initialBooks={books} />
    </main>
  );
}
