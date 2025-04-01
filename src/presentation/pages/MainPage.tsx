import "../styles/App.scss";
import Book from "../components/Book";
import { useEffect, useState } from "react";
import {
  getBookRating,
  getBooks,
  getFavoriteBooks,
} from "../../data/apiService";
import DefaultPageLayout from "./DefaultPage";
import { DBBook } from "../../models/book";

function MainPage() {
  const [books, setBooks] = useState<DBBook[]>([]);
  const [favs, setFavs] = useState<Map<string, boolean>>(new Map());
  const [ratings, setRatings] = useState<Map<string, number | null>>(new Map());

  useEffect(() => {
    getBooks()
      .then((books) => setBooks(books))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        await getFavs();
        await getRatings();
      } catch (e) {
        console.log(e);
      }
    };
    func();
  }, [books]);

  return (
    <DefaultPageLayout>
      <h4 className="mb-2 mt-2">Популярные</h4>
      <div className="flex-cont">
        {books.map((book) => (
          <Book
            book={book}
            rating={ratings.get(book._id)}
            isFavorite={favs.get(book._id)}
          />
        ))}
      </div>
    </DefaultPageLayout>
  );

  async function getRatings() {
    const newRatings = new Map<string, number | null>();

    for (const b of books) {
      const r = await getBookRating(b._id);
      newRatings.set(b._id, r?.rating ?? null);
    }

    setRatings(newRatings);
  }

  async function getFavs() {
    const newFavs = new Map<string, boolean>();
    const favs = await getFavoriteBooks();

    for (const b of books) {
      const isFavorite = favs.findIndex((x) => x._id === b._id) !== -1;
      newFavs.set(b._id, isFavorite);
    }

    setFavs(newFavs);
    console.log(newFavs);
  }
}

export default MainPage;
