import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../styles/App.scss";
import logo from "../../../assets/logoOwlBook.png";
import { useState } from "react";
import { login } from "../../../data/apiService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetStates = () => {
    setEmail("");
    setPassword("");
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const handleLogin = async () => {
    try {
      const result = await login(email, password);

      if (result.status >= 200 && result.status < 300) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      resetStates();
    }
  };

  return (
    <>
      <Stack className="my-cont">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="header">
          <h2>Войдите в свой аккаунт</h2>
          <p className="grey-text">
            С возвращением! Пожалуйста, введите свои данные
          </p>
        </div>

        <Form>
          {/*EMAIL*/}
          <Form.Group className="mb-2">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="userName"
              value={email}
              onChange={changeEmail}
              type="email"
              placeholder="Введите вашу почту"
            />
          </Form.Group>

          {/*Пароль*/}
          <Form.Group className="mb-2">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="userPassword"
              value={password}
              onChange={changePassword}
              aria-describedby="passwordHelpBlock"
              placeholder="Введите ваш пароль"
            />
          </Form.Group>

          <Form.Group className="remember">
            <Form.Check type="checkbox" label="Запомнить меня" />
          </Form.Group>

          {/* TODO: поменять на нормальную ссылку для сброса пароля */}
          <a href="/" className="mb-2">
            Забыл(а) пароль
          </a>

          <Stack className="mt-3">
            <Button
              className="mb-2"
              as="input"
              type="button"
              onClick={handleLogin}
              value="Войти"
            />
          </Stack>
        </Form>

        <p className="grey-text">
          Нет аккаунта? <a href="/signup">Зарегистрироваться</a>
        </p>
      </Stack>
    </>
  );
}

export default Login;
