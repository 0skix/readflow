"use client";
import { useState, FormEvent } from "react";
import BookCard from "@/components/BookCard";

export default function CatalogPage() {
  const [q, setQ] = useState("");
  interface Book {
    key: string;
    title: string;
    author: string;
    coverUrl: string;
    pages: number;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!q) return;
    setLoading(true);
    const resp = await fetch(
      `/api/catalog?q=${encodeURIComponent(q)}&limit=20&page=1`
    );
    const json = await resp.json();
    if (resp.ok) setBooks(json.books);
    else alert(json.error);
    setLoading(false);
  }

  return (
    <main className="flex min-h-[88vh] flex-col items-center justify-between p-4 bg-neutral">
      {/* Formularz wyszukiwania */}
      <form onSubmit={onSearch} className="flex flex-col w-full max-w-xl  mb-8">
        <div className="flex  w-full max-w-xl  mb-8">
          <input
            className="input input-bordered flex-grow mr-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Wpisz tytuł książki"
          />

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Szukaj"
            )}
          </button>
        </div>
        {!loading && books.length === 0 && (
          <div className="text-center text-gray-500 space-y-2">
            <p className="text-2xl font-semibold">Witaj w ReadFlow!</p>
            <p>Wyszukaj książkę powyżej, aby zobaczyć wyniki.</p>
          </div>
        )}
      </form>

      {books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {books.map((b) => (
            <BookCard
              key={b.key}
              title={b.title}
              author={b.author}
              coverUrl={b.coverUrl}
              pages={b.pages}
              onDetails={() => {}}
            />
          ))}
        </div>
      )}
    </main>
  );
}
