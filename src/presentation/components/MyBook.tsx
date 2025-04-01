import { Card, Button, Stack } from "react-bootstrap";
import logo from "../../assets/logoOwlBook.png";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../../data/apiService";
import { useState } from "react";
import ModalDeleteBook from "./modals/ModalDeleteBook";
import Routes, { prepareUrl } from "../../app/routes";
import { useDispatch } from "react-redux";
import { deleteBook as deleteBookAction } from "../../store/slices/booksSlice";
import { DBBook } from "../../models/book";

type BookProps = { book: DBBook; onDelete: () => void };

export default function MyBook({ book, onDelete }: BookProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);

  const handleEditBook = () =>
    navigate(prepareUrl(Routes.bookEdit, { id: book._id }));

  const handleChangeChapters = () =>
    navigate(prepareUrl(Routes.bookChaptersEdit, { id: book._id }));

  const handleDeleteClick = async () => {
    try {
      //тут всплывающая модалка с подтверждением что пользователь хочет удалить книгу
      await deleteBook(book._id);
      dispatch(deleteBookAction(book._id));
      setShowDeleteBookModal(false);
      onDelete();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.user.name}</Card.Text>
          <Card.Text>{book.summary}</Card.Text>
          <Stack gap={2}>
            <Stack direction="horizontal" gap={2}>
              <Button variant="primary" onClick={handleEditBook}>
                Редактировать
              </Button>
              <Button
                variant="danger"
                onClick={() => setShowDeleteBookModal(true)}
              >
                Удалить
              </Button>
            </Stack>
            <Button variant="primary" onClick={handleChangeChapters}>
              Добавить/изменить главы
            </Button>
          </Stack>
        </Card.Body>
      </Card>

      <ModalDeleteBook
        show={showDeleteBookModal}
        onHide={() => setShowDeleteBookModal(false)}
        onDelete={handleDeleteClick}
      />
    </>
  );
}
