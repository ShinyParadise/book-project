import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../styles/App.scss";
import Container from "react-bootstrap/Container";
import logo from "../../../assets/logoOwlBook.png";
import StarRating from "../../components/StarRating";
import Comment from "../../components/Comment";
import DefaultPageLayout from "../DefaultPage";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addComment,
  getBook,
  getChapters,
  getCommentsByBook,
  getUserRating,
  sendBookReport,
  updateRating,
} from "../../../data/apiService";
import Chapter from "../../components/Chapter";
import ModalReportBook from "../../components/modals/ModalReportBook";
import Routes, { prepareUrl } from "../../../app/routes";
import { DBBook } from "../../../models/book";
import { DBChapter } from "../../../models/chapter";
import { DBComment } from "../../../models/comment";

export default function BookPage() {
  const { id } = useParams();

  const [book, setBook] = useState<DBBook>();
  const [chapters, setChapters] = useState<DBChapter[]>([]);
  const [comments, setComments] = useState<DBComment[]>([]);
  const [userComment, setUserComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showReportBookModal, setShowReportBookModal] = useState(false);

  const handleReportBook = async (text: string) => {
    try {
      if (book === undefined) return;
      await sendBookReport(book._id, text);
      setShowReportBookModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id === undefined) return;

    getBook(id)
      .then((fetched) => setBook(fetched))
      .catch((e) => console.log(e));

    getCommentsByBook(id)
      .then((fetched) => setComments(fetched))
      .catch((e) => console.log(e));

    getChapters(id)
      .then((chapters) => setChapters(chapters))
      .catch((e) => console.log(e));

    getUserRating(id)
      .then((rating) => setRating(rating.grade))
      .catch((e) => console.log(e));
  }, [id]);

  const changeUserComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserComment(e.currentTarget.value);

  const submitComment = async () => {
    if (id === undefined) return;
    try {
      const newComment = await addComment(id, userComment);
      setComments([newComment, ...comments]);
      setUserComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateRating = async (rating: number) => {
    if (id === undefined) return;

    try {
      await updateRating(id, rating);
      setRating(rating);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2 className="text-center mb-4">{book?.title ?? "Название книги"}</h2>

        <Stack
          direction="horizontal"
          className="justify-content-start align-items-start"
          gap={2}
        >
          <Stack className="w-25">
            <img
              src={logo}
              className="book-cover align-self-center"
              alt="logo"
            />
            <div className="align-self-center">
              <StarRating value={rating} onUpdate={handleUpdateRating} />
            </div>
            <h3 className="mt-3">Содержание</h3>
            <h4>Главы:</h4>
            <Stack direction="vertical">
              {/* для нумерации глав используем индекс i */}
              {chapters.map((chapter, i) => (
                <Chapter chapter={chapter} key={chapter._id} index={i + 1} />
              ))}
            </Stack>
          </Stack>

          <Stack>
            <p>Описание книги: {book?.summary ?? "Не указано"}</p>
            <p>
              Автор книги:
              <Link
                className="ms-2"
                to={prepareUrl(Routes.author, { id: book?.userId })}
              >
                {book?.user.name}
              </Link>
            </p>
            <p>Метки: {book?.tags ?? "Не указан"}</p>
            <p>
              Возрастное ограничение: {book?.ageRestriction ?? "Не указано"}
            </p>
            <p>Жанры: </p>
            <p>Статус: </p>
            <p>Дата публикации: </p>
            <Button
              className="mt-2"
              type="submit"
              as="input"
              variant="danger"
              value="Пожаловаться на книгу "
              onClick={() => setShowReportBookModal(true)}
            />
          </Stack>
        </Stack>
        <Stack className="mt-4">
          <h3>Комментарии</h3>
          <Form.Control
            className="mb-2"
            as="textarea"
            placeholder="Введите ваш комментарий"
            style={{ height: "100px" }}
            value={userComment}
            onChange={changeUserComment}
          />
          <Button
            className="mb-2"
            as="input"
            type="button"
            value="Отправить"
            onClick={submitComment}
          />
          {/* Тут будет список комментариев*/}
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </Stack>
      </Container>
      <ModalReportBook
        show={showReportBookModal}
        onHide={() => setShowReportBookModal(false)}
        onReport={handleReportBook}
      />
    </DefaultPageLayout>
  );
}
