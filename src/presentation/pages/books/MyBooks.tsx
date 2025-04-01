import { useEffect, useState } from "react";
import { getCurrentUserBooks } from "../../../data/apiService";
import DefaultPageLayout from "../DefaultPage";
import MyBook from "../../components/MyBook";
import { DBBook } from "../../../models/book";

export default function MyBooks() {
  const [books, setBooks] = useState<DBBook[]>([]);

  useEffect(() => {
    getCurrentUserBooks()
      .then((books) => setBooks(books))
      .catch((e) => console.log(e));
  }, []);

  const handleBookDelete = (id: string) => {
    const newBooks = books.filter((item) => item._id !== id);
    setBooks(newBooks);
  };

  return (
    <>
      <DefaultPageLayout>
        <h4 className="mb-2 mt-2">Мои книги</h4>
        <div className="flex-cont">
          {books.map((book) => (
            <MyBook book={book} onDelete={() => handleBookDelete(book._id)} />
          ))}
        </div>
      </DefaultPageLayout>
    </>
  );
}
