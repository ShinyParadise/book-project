import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../styles/App.scss";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { addChapter } from "../../../data/apiService";
import DefaultPageLayout from "../DefaultPage";
import { useNavigate, useParams } from "react-router-dom";
import Routes, { prepareUrl } from "../../../app/routes";

export default function AddChapter() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [chapterName, setChapterName] = useState("");
  const [chapterText, setChapterText] = useState("");
  const [authorComment, setAuthorComment] = useState("");

  const changeChapterName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChapterName(e.currentTarget.value);

  const changeChapterText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setChapterText(e.currentTarget.value);

  const changeAuthorComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAuthorComment(e.currentTarget.value);

  const handleSendChapter = async () => {
    try {
      if (bookId === undefined) return;

      const result = await addChapter(
        bookId,
        chapterName,
        chapterText,
        authorComment,
      );
      console.log(result);
      navigate(prepareUrl(Routes.bookChaptersEdit, { id: bookId }));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2 className="header">Добавить новую главу</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Название главы</Form.Label>
            <Form.Control
              name="chapterName"
              value={chapterName}
              onChange={changeChapterName}
              type="text"
              placeholder="Глава 1"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Текстовый редактор</Form.Label>
            <Form.Control
              name="chapterText"
              value={chapterText}
              onChange={changeChapterText}
              type="text"
              as="textarea"
              rows={6}
              placeholder="Здесь будет текст главы"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Комментарий к части</Form.Label>
            <Form.Control
              name="authorComment"
              value={authorComment}
              onChange={changeAuthorComment}
              type="text"
              as="textarea"
              rows={3}
              placeholder="Здесь будет ваш комментарий к главе"
            />
          </Form.Group>

          <Button
            type="button"
            className="mb-2"
            onClick={handleSendChapter}
            as="input"
            value="Сохранить и перейти к публикации"
          />
        </Form>
      </Container>
    </DefaultPageLayout>
  );
}
