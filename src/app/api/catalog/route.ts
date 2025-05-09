import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // pobieramy parametry q, page i limit
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  if (!q) {
    return NextResponse.json({ error: 'Brak parametru q' }, { status: 400 });
  }

  const offset = (page - 1) * limit;
  const olUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`;

  // Fetchujemy bezpośrednio z OpenLibrary
  const res = await fetch(olUrl);
  if (!res.ok) {
    return NextResponse.json({ error: res.statusText }, { status: res.status });
  }

  const data = await res.json();
  interface OpenLibraryDoc {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    number_of_pages_median?: number;
  }

  const books = (data.docs as OpenLibraryDoc[]).map(doc => ({
    key: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? '',
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    pages: doc.number_of_pages_median ?? null,
  }));

  return NextResponse.json({ books, total: data.numFound });
}