import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// Definicja tras publicznych (dostępnych bez logowania)
const publicRoutes = ["/login", "/sign-up", "/sign-in"];

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);  // odśwież sesję i pobierz użytkownika

  // Jeśli użytkownik nie jest zalogowany i idzie na stronę chronioną – przekieruj do /login
  const isPublic = publicRoutes.includes(request.nextUrl.pathname);
  if (!user && !isPublic) {
    const redirectUrl = new URL("/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // (Opcjonalnie) Jeśli użytkownik ZALOGOWANY wchodzi na stronę logowania/rejestracji, przekieruj gdzie indziej, np. na stronę główną
  if (user && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;  // kontynuuj obsługę żądania, przekazując ewentualnie zaktualizowane cookies
}

// Konfiguracja matchera – na jakie ścieżki ma działać middleware
export const config = {
  matcher: [
    // Użyj wyrażeń, by objąć wszystkie dynamiczne trasy, a pominąć pliki statyczne:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ],
};