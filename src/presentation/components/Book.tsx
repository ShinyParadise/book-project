import { Card, Button, Stack } from "react-bootstrap";
import logo from "../../assets/logoOwlBook.png";
import { Link, useNavigate } from "react-router-dom";
import Routes, { prepareUrl } from "../../app/routes";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import StarRating from "./StarRating";
import { addFavoriteBook, deleteFavoriteBook } from "../../data/apiService";
import { useDispatch } from "react-redux";
import { updateBook } from "../../store/slices/booksSlice";
import { DBBook } from "../../models/book";

type BookProps = { book: DBBook; rating?: number | null; isFavorite?: boolean };

export default function Book({ book, rating, isFavorite = false }: BookProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favorite, setFavorite] = useState(isFavorite);

  const handleReadClick = () =>
    navigate(prepareUrl(Routes.bookpage, { id: book._id }));

  const handleAddFavorite = () => {
    const updatedBook = { ...book, isFavorite: true };
    dispatch(updateBook(updatedBook));
    setFavorite(true);
    addFavoriteBook(book._id);
  };

  const handleRemoveFavorite = () => {
    const updatedBook = { ...book, isFavorite: false };
    dispatch(updateBook(updatedBook));
    setFavorite(false);
    deleteFavoriteBook(book._id);
  };

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={logo} />
        <Card.Body>
          <Stack
            direction="horizontal"
            className="justify-content-between align-items-start"
          >
            <Card.Title className="text-break">{book.title}</Card.Title>
            {favorite ? (
              <MdFavorite onClick={handleRemoveFavorite} />
            ) : (
              <MdOutlineFavoriteBorder onClick={handleAddFavorite} />
            )}
          </Stack>

          <Stack direction="vertical">
            <StarRating value={rating ?? 0} />
            <Link to={prepareUrl(Routes.author, { id: book.userId })}>
              {book.user.name}
            </Link>
          </Stack>
          <Card.Text>{book.summary}</Card.Text>
          <Button variant="primary" onClick={handleReadClick}>
            Читать
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
