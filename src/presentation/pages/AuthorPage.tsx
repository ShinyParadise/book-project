import { Button, Stack } from "react-bootstrap";
import "../styles/App.scss";
import Container from "react-bootstrap/Container";
import logo from "../../assets/logoOwlBook.png";
import DefaultPageLayout from "./DefaultPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserBooks, sendUserReport } from "../../data/apiService";
import Book from "../components/Book";
import ModalReportAuthor from "../components/modals/ModalReportAuthor";
import { DBBook } from "../../models/book";

export default function AuthorPage() {
  const { id } = useParams();
  const [books, setBooks] = useState<DBBook[]>([]);
  const [latestBook, setLatestBook] = useState<DBBook>();
  const [showReportAuthorModal, setShowReportAuthorModal] = useState(false);

  useEffect(() => {
    if (id === undefined) return;

    getUserBooks(id)
      .then((books) => {
        setBooks(books);
        setLatestBook(books[books.length - 1]);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const handleReportAuthor = async (text: string) => {
    try {
      if (id === undefined) return;

      await sendUserReport(id, text);
      setShowReportAuthorModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultPageLayout>
      <Container>
        <Stack
          direction="horizontal"
          className="justify-content-between align-items-center p-2"
        >
          <h2>Автор: {latestBook?.user.name ?? ""}</h2>
          <Button
            className="align-self-end ms-5"
            type="submit"
            as="input"
            variant="danger"
            value="Пожаловаться на автора"
            onClick={() => setShowReportAuthorModal(true)}
          />
        </Stack>
        <Stack direction="horizontal">
          <Stack className="w-25">
            <img
              src={logo}
              className="book-cover align-self-center"
              alt="logo"
            />
          </Stack>
          <Stack>
            <p>Количество книг: {books.length}</p>
            <p>
              Последняя книга: {latestBook?.title ?? ""} И дата публикации:
              {latestBook?.createdAt.toString() ?? ""}
            </p>
          </Stack>
        </Stack>
        <Stack direction="horizontal">
          <div className="flex-cont p-2">
            {books.map((book) => (
              <Book book={book} />
            ))}
          </div>
        </Stack>
      </Container>

      <ModalReportAuthor
        show={showReportAuthorModal}
        onHide={() => setShowReportAuthorModal(false)}
        onReport={handleReportAuthor}
      />
    </DefaultPageLayout>
  );
}
