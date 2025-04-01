import { Button, Form } from "react-bootstrap";
import "../../styles/App.scss";
import Container from "react-bootstrap/Container";
import DefaultPageLayout from "../DefaultPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, updateBook } from "../../../data/apiService";
import { DBBook } from "../../../models/book";
export default function EditBook() {
  const { id } = useParams();
  const radioAge = ["6+", "12+", "16+", "18+"];
  const radioComments = [
    "Разрешить публикацию комментариев",
    "Запретить публикацию комментариев",
  ];

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [summary, setSummary] = useState("");

  const [age, setAge] = useState(radioAge[0]);

  const [comment, setComment] = useState(radioComments[0]);
  const [agreement, setAgreement] = useState(false);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const changeTags = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTags(e.currentTarget.value);

  const changeSummary = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSummary(e.currentTarget.value);

  const handleSaveBook = async () => {
    try {
      if (id === undefined) return;

      const result = await updateBook(id, title, age, tags, summary, comment);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const setFields = (book: DBBook) => {
    setTitle(book.title);
    setTags(book.tags);
    setAge(book.ageRestriction);
    setComment(book.commentRestriction);
    setSummary(book.summary);
    setAgreement(book.agreement);
  };

  useEffect(() => {
    if (id === undefined) return;

    getBook(id)
      .then((book) => setFields(book))
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2>Изменить книгу</h2>
        <Form>
          <Container className="inputText">
            <Form.Group className="mb-2">
              <Form.Label>Название книги: </Form.Label>
              <Form.Control
                name="bookName"
                value={title}
                onChange={changeTitle}
                type="text"
                placeholder="Введите название книги"
              />
            </Form.Group>
            <p className="age">Ограничение по возрасту</p>
            {radioAge.map((option) => (
              <div key={option} className="mb-2">
                <Form.Check
                  type="radio"
                  label={option}
                  name="radioAge"
                  checked={option === age}
                  onChange={() => setAge(option)}
                />
              </div>
            ))}
            <Container className="inputText">
              <Form.Group className="mb-2">
                <Form.Label>Метки: </Form.Label>
                <Form.Control
                  name="tags"
                  value={tags}
                  onChange={changeTags}
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="Введите ключевые слова по которым
              пользователи смогут находить вашу книгу"
                />
              </Form.Group>
            </Container>
            <Container className="inputText">
              <Form.Group className="mb-2">
                <Form.Label>Краткое содержание: </Form.Label>
                <Form.Control
                  name="bookName"
                  value={summary}
                  onChange={changeSummary}
                  type="text"
                  as="textarea"
                  rows={6}
                  placeholder="Введите краткое описание вашей книги"
                />
              </Form.Group>
            </Container>
            <p className="comments">Запрет/разрешение комментариев</p>
            {radioComments.map((option) => (
              <div key={option} className="mb-2">
                <Form.Check
                  type="radio"
                  label={option}
                  name="radioComments"
                  checked={option === comment}
                  onChange={() => setComment(option)}
                />
              </div>
            ))}

            <Button
              type="button"
              className="mt-2"
              onClick={handleSaveBook}
              as="input"
              value="Сохранить"
            />
          </Container>
        </Form>
      </Container>
    </DefaultPageLayout>
  );
}
