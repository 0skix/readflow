"use client";
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";

type UserBook = {
  id: number;
  book_key: string;
  title: string;
  author: string;
  cover_url?: string;
  pages?: number;
  status: "to_read" | "reading" | "read";
};

export default function ProfilePage() {
  const [books, setBooks] = useState<UserBook[]>([]);

  useEffect(() => {
    fetch("/api/user-books")
      .then((res) => res.json())
      .then((data) => setBooks(data || []));
  }, []);

  const groups = {
    to_read: books.filter((b) => b.status === "to_read"),
    reading: books.filter((b) => b.status === "reading"),
    read: books.filter((b) => b.status === "read"),
  };

  return (
    <main
      className="flex min-h-screen flex-row  justify-between p-4 gap-5
     bg-neutral"
    >
      {(["to_read", "reading", "read"] as const).map((status) => (
        <div className="card bg-base-100 w-96 shadow-sm p-4" key={status}>
          <h2 className="text-xl font-semibold mb-4 capitalize">
            {status.replace("_", " ")}
          </h2>
          <div className="space-y-4">
            {groups[status].map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.cover_url}
                pages={book.pages}
                onDetails={() => {}}
              />
            ))}
            {groups[status].length === 0 && (
              <p className="text-gray-500">Brak książek</p>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
