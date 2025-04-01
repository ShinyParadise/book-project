import { Button, Form, Stack } from "react-bootstrap";
import "../../styles/App.scss";
import Container from "react-bootstrap/Container";
import DefaultPageLayout from "../DefaultPage";
import { useState } from "react";
import { addBook } from "../../../data/apiService";
import Routes from "../../../app/routes";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const radioAge = ["6+", "12+", "16+", "18+"];
  const radioComments = [
    "Разрешить публикацию комментариев",
    "Запретить публикацию комментариев",
  ];

  const [title, setTitle] = useState("");
  const [bookTags, setBookTags] = useState("");
  const [summary, setSummary] = useState("");
  const [age, setAge] = useState(radioAge[0]);
  const [comment, setComment] = useState(radioComments[0]);
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const changeBookTags = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBookTags(e.currentTarget.value);

  const changeSummary = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSummary(e.currentTarget.value);

  const changeAgreement = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAgreement(!agreement);

  const handleSendBook = async () => {
    try {
      const result = await addBook(
        title,
        age,
        bookTags,
        summary,
        comment,
        agreement,
      );
      navigate(Routes.myBooks);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DefaultPageLayout>
      <Container className="content">
        <h2>Добавить новую книгу</h2>
        <Form className="addBook">
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
                  onChange={() => setAge(option)}
                />
              </div>
            ))}
            <Container className="inputText">
              <Form.Group className="mb-2">
                <Form.Label>Метки: </Form.Label>
                <Form.Control
                  name="tags"
                  value={bookTags}
                  onChange={changeBookTags}
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
                  onChange={() => setComment(option)}
                />
              </div>
            ))}
            <Stack direction="horizontal" gap={3}>
              <Form.Check
                type="checkbox"
                name="checkboxAgreement"
                onChange={changeAgreement}
                checked={agreement}
                label="Я подтверждаю, что являюсь автором публикуемого мной текста и
                понимаю, что публикация чужих работ или публикация работ,
                нарушающих правила, может привести к удалению этих работ и
                блокировке к доступу на сайт"
              />
            </Stack>

            <Button
              type="button"
              className="mb-2"
              onClick={handleSendBook}
              as="input"
              value="Сохранить и перейти к публикации"
            />
          </Container>
        </Form>
      </Container>
    </DefaultPageLayout>
  );
}
