import { useEffect, useState } from "react";
import DefaultPageLayout from "./DefaultPage";
import { getBookRating, getFavoriteBooks } from "../../data/apiService";
import Book from "../components/Book";
import { DBBook } from "../../models/book";

export default function Favorites() {
  const [books, setBooks] = useState<DBBook[]>([]);
  const [ratings, setRatings] = useState<Map<string, number | null>>(new Map());

  useEffect(() => {
    getFavoriteBooks()
      .then((books) => {
        setBooks(books);
        getRatings();
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <DefaultPageLayout>
        <h4 className="mb-2 mt-2">Мое избранное:</h4>
        <div className="flex-cont">
          {books.map((book) => (
            <Book
              book={book}
              isFavorite={true}
              rating={ratings.get(book._id)}
            />
          ))}
        </div>
      </DefaultPageLayout>
    </>
  );

  async function getRatings() {
    const newRatings = new Map<string, number | null>();

    for (const b of books) {
      const r = await getBookRating(b._id);
      newRatings.set(b._id, r?.rating ?? null);
    }

    setRatings(newRatings);
  }
}
