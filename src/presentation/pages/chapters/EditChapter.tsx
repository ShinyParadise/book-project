import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../styles/App.scss";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getChapter, updateChapter } from "../../../data/apiService";
import DefaultPageLayout from "../DefaultPage";
import { useNavigate, useParams } from "react-router-dom";
import Routes, { prepareUrl } from "../../../app/routes";
import { DBChapter } from "../../../models/chapter";

export default function EditChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [chapter, setChapter] = useState<DBChapter>();

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  const changeComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setComment(e.currentTarget.value);

  const handleSaveChapter = async () => {
    try {
      if (chapter === undefined) return;

      const result = await updateChapter(
        chapter._id,
        chapter.bookId,
        title,
        text,
        comment,
      );
      console.log(result);

      navigate(prepareUrl(Routes.bookChaptersEdit, { id: chapter.bookId }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (chapterId === undefined) return;

    getChapter(chapterId)
      .then((chapter) => {
        setChapter(chapter);
        setTitle(chapter.title);
        setText(chapter.text);
        setComment(chapter.comment);
      })
      .catch((e) => console.log(e));
  }, [chapterId]);

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2 className="header">Изменить главу</h2>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Название главы</Form.Label>
            <Form.Control
              name="chapterName"
              value={title}
              onChange={changeTitle}
              type="text"
              placeholder="Глава 1"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Текстовый редактор</Form.Label>
            <Form.Control
              name="chapterText"
              value={text}
              onChange={changeText}
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
              value={comment}
              onChange={changeComment}
              type="text"
              as="textarea"
              rows={3}
              placeholder="Здесь будет ваш комментарий к главе"
            />
          </Form.Group>

          <Button
            type="button"
            className="mb-2"
            onClick={handleSaveChapter}
            as="input"
            value="Сохранить"
          />
        </Form>
      </Container>
    </DefaultPageLayout>
  );
}
