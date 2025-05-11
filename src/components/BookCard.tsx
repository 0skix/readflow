import React from "react";
import Image from "next/image";

export interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string | null;
  pages?: number | null;
  genre?: string;
}

export default function BookCard({
  title,
  author,
  coverUrl,
  pages,
  genre,
}: BookCardProps) {
  return (
    <div className="card w-80 bg-base-100 shadow-lg rounded-lg overflow-hidden">
      {coverUrl ? (
        <div className="relative h-56 w-full">
          <Image
            src={coverUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      ) : (
        <div className="h-56 bg-base-200 flex items-center justify-center">
          <span className="text-gray-400">Brak okładki</span>
        </div>
      )}
      <div className="card-body p-6">
        <h2 className="card-title text-lg font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-500 truncate">{author}</p>
        {genre && (
          <div className="badge badge-outline badge-md mt-3">{genre}</div>
        )}
        <div className="mt-3 text-sm">
          {pages != null && <span>Liczba stron: {pages}</span>}
        </div>
        <div className="card-actions justify-end mt-6"></div>
      </div>
    </div>
  );
}
