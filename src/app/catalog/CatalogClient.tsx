"use client";
import { useState, FormEvent } from "react";
import BookCard from "@/components/BookCard";

type UserBookKey = string;

interface Book {
  key: string;
  title: string;
  author: string;
  coverUrl: string;
  pages: number;
}

interface CatalogClientProps {
  initialKeys: UserBookKey[];
}

export default function CatalogClient({ initialKeys }: CatalogClientProps) {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  // śledzimy, które książki już dodano
  const [addedKeys, setAddedKeys] = useState<UserBookKey[]>(initialKeys);
  // loading dla operacji dodawania pojedynczej książki
  const [loadingAdd, setLoadingAdd] = useState<UserBookKey[]>([]);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    if (!q) return;
    setLoadingSearch(true);
    const resp = await fetch(
      `/api/catalog?q=${encodeURIComponent(q)}&limit=20&page=1`
    );
    const json = await resp.json();
    if (resp.ok) {
      setBooks(json.books);
    } else {
      alert(json.error);
    }
    setLoadingSearch(false);
  }

  async function onAdd(book: Book) {
    // blokujemy przycisk dla tej książki
    setLoadingAdd((prev) => [...prev, book.key]);
    try {
      const resp = await fetch("/api/user-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_key: book.key,
          title: book.title,
          author: book.author,
          cover_url: book.coverUrl,
          pages: book.pages,
        }),
      });
      const payload = await resp.json();
      if (resp.ok && payload.success) {
        setAddedKeys((prev) => [...prev, book.key]);
      } else {
        throw new Error(payload.error || "Nie udało się dodać książki");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoadingAdd((prev) => prev.filter((k) => k !== book.key));
    }
  }

  return (
    <main className="flex min-h-[88vh] flex-col items-center justify-between p-4 bg-neutral">
      <form onSubmit={onSearch} className="flex flex-col w-full max-w-xl mb-8">
        <div className="flex w-full mb-8">
          <input
            className="input input-bordered flex-grow mr-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Wpisz tytuł książki"
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loadingSearch}
          >
            {loadingSearch ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Szukaj"
            )}
          </button>
        </div>
        {!loadingSearch && books.length === 0 && (
          <div className="text-center text-gray-500 space-y-2">
            <p className="text-2xl font-semibold">Witaj w ReadFlow!</p>
            <p>Wyszukaj książkę powyżej, aby zobaczyć wyniki.</p>
          </div>
        )}
      </form>

      {books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {books.map((b) => {
            const isAdded = addedKeys.includes(b.key);
            const isAdding = loadingAdd.includes(b.key);
            return (
              <div key={b.key} className="flex flex-col relative">
                <BookCard
                  title={b.title}
                  author={b.author}
                  coverUrl={b.coverUrl}
                  pages={b.pages}
                />
                <button
                  className="btn btn-secondary m-2 absolute bottom-4"
                  onClick={() => onAdd(b)}
                  disabled={isAdded || isAdding}
                >
                  {isAdded ? (
                    "Dodano"
                  ) : isAdding ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Dodaj"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
