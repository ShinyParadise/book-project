import { useEffect, useState } from "react";
import Book from "../components/Book";
import {
  getBookRating,
  searchAuthors,
  searchBooks,
} from "../../data/apiService";
import DefaultPageLayout from "./DefaultPage";
import { Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Routes, { prepareUrl } from "../../app/routes";
import { DBBook } from "../../models/book";
import { DBUser } from "../../models/user";

export default function SearchPage() {
  const { text } = useParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState<DBBook[]>([]);
  const [authors, setAuthors] = useState<DBUser[]>([]);
  const [ratings, setRatings] = useState<Map<string, number | null>>(new Map());

  useEffect(() => {
    if (text === undefined) return;

    searchBooks(text)
      .then((books) => setBooks(books))
      .catch((e) => console.log(e));

    searchAuthors(text)
      .then((fetched) => setAuthors(fetched))
      .catch((e) => console.log(e));
  }, [text]);

  useEffect(() => {
    const func = async () => {
      try {
        const newRatings = new Map<string, number | null>();

        for (const b of books) {
          const r = await getBookRating(b._id);
          newRatings.set(b._id, r?.rating ?? null);
        }

        setRatings(newRatings);
      } catch (e) {
        console.log(e);
      }
    };
    func();
  }, [books]);

  return (
    <DefaultPageLayout>
      <h4 className="mb-2 mt-2">Книги:</h4>
      <div className="flex-cont">
        {books.map((book) => (
          <Book book={book} rating={ratings.get(book._id)} />
        ))}
      </div>

      <h4 className="mb-2 mt-4">Авторы:</h4>
      <Stack direction="vertical">
        {authors.map((author) => (
          <a
            onClick={() =>
              navigate(prepareUrl(Routes.author, { id: author._id }))
            }
            className="link-opacity-100"
            href=""
          >
            {author.name}
          </a>
        ))}
      </Stack>
    </DefaultPageLayout>
  );
}
