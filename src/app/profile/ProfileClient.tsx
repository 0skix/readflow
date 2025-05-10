"use client";
import { useState } from "react";
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

export default function ProfileClient({
  initialBooks,
}: {
  initialBooks: UserBook[];
}) {
  const [books, setBooks] = useState<UserBook[]>(initialBooks);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  const updateStatus = async (
    book: UserBook,
    newStatus: UserBook["status"]
  ) => {
    setLoadingIds((ids) => [...ids, book.id]);
    try {
      const resp = await fetch("/api/user_books", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: book.id, status: newStatus }),
      });
      const { success, error } = await resp.json();
      if (!success) throw new Error(error);
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, status: newStatus } : b))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoadingIds((ids) => ids.filter((i) => i !== book.id));
    }
  };

  const deleteBook = async (book: UserBook) => {
    setLoadingIds((ids) => [...ids, book.id]);
    try {
      const resp = await fetch("/api/user-book", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: book.id }),
      });
      const { success, error } = await resp.json();
      if (!success) throw new Error(error);
      setBooks((prev) => prev.filter((b) => b.id !== book.id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setLoadingIds((ids) => ids.filter((i) => i !== book.id));
    }
  };

  const groups = {
    to_read: books.filter((b) => b.status === "to_read"),
    reading: books.filter((b) => b.status === "reading"),
    read: books.filter((b) => b.status === "read"),
  };

  const statusLabels: Record<UserBook["status"], string> = {
    to_read: "Do przeczytania",
    reading: "Czytam",
    read: "Przeczytane",
  };
  const statusOrder: UserBook["status"][] = ["to_read", "reading", "read"];

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {statusOrder.map((status) => (
          <div
            key={status}
            className="flex-1 bg-base-100 rounded-lg shadow p-6 flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {statusLabels[status]}
            </h2>
            <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
              {groups[status].length > 0 ? (
                groups[status].map((book) => {
                  const isLoading = loadingIds.includes(book.id);
                  return (
                    <div key={book.id} className="flex flex-col">
                      <BookCard
                        title={book.title}
                        author={book.author}
                        coverUrl={book.cover_url}
                        pages={book.pages}
                      />

                      {/* Dropdown */}
                      <div className="m-4 flex justify-center absolute">
                        <div className="dropdown">
                          <button
                            tabIndex={0}
                            className="btn btn-primary btn-sm "
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              "Opcje ▾"
                            )}
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48"
                          >
                            {statusOrder
                              .filter((s) => s !== status)
                              .map((target) => (
                                <li key={target}>
                                  <button
                                    disabled={isLoading}
                                    onClick={() => updateStatus(book, target)}
                                    className="btn btn-ghost btn-sm w-full justify-start"
                                  >
                                    Przenieś: {statusLabels[target]}
                                  </button>
                                </li>
                              ))}
                            <li>
                              <button
                                disabled={isLoading}
                                onClick={() => deleteBook(book)}
                                className="btn btn-ghost btn-sm w-full justify-start text-error"
                              >
                                Usuń książkę
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center mt-4">Brak książek</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
