import { useNavigate, useParams } from "react-router-dom";
import DefaultPageLayout from "../DefaultPage";
import { Button, Container, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getBook, getChapters } from "../../../data/apiService";
import MyChapter from "../../components/MyChapter";
import Routes, { prepareUrl } from "../../../app/routes";
import { DBChapter } from "../../../models/chapter";
import { DBBook } from "../../../models/book";

export default function EditBookChapters() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState<DBChapter[]>([]);
  const [book, setBook] = useState<DBBook>();

  useEffect(() => {
    if (id === undefined) return;

    getBook(id)
      .then((book) => setBook(book))
      .catch((e) => console.log(e));

    getChapters(id)
      .then((chapters) => setChapters(chapters))
      .catch((e) => console.log(e));
  }, [id]);

  const handleAddChapter = () => {
    if (id === undefined) return;
    navigate(prepareUrl(Routes.chapterAdd, { bookId: id }));
  };

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2 className="mb-3">Главы книги {book?.title}</h2>
        <Stack gap={2}>
          {chapters.map((chapter, i) => (
            <MyChapter chapter={chapter} index={i} />
          ))}
        </Stack>
        <Button className="mt-3" onClick={handleAddChapter}>
          Добавить новую главу
        </Button>
      </Container>
    </DefaultPageLayout>
  );
}
