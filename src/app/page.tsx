import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Witaj w świecie książek!</h1>
        <p className="text-lg text-gray-400 mb-8">
          Przygotuj się na niezapomnianą przygodę.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/signup" className="btn btn-primary">
            Dołącz teraz
          </a>
          <Link href="/catalog" className="btn btn-secondary">
            Przeglądaj katalog
          </Link>
        </div>
      </div>
    </main>
  );
}
