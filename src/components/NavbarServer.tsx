import { createClient } from "@/utils/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <NavbarClient
      user={user && user.email ? { id: user.id, email: user.email } : null}
    />
  );
}
