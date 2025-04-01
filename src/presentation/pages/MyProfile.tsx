import { Button, FormGroup, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../styles/App.scss";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import DefaultPageLayout from "./DefaultPage";
import { deleteUser, getCurrentUser, updateUser } from "../../data/apiService";
import ModalDeleteProfile from "../components/modals/ModalDeleteProfile";
import { useNavigate } from "react-router-dom";
import Routes from "../../app/routes";

export default function MyProfile() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const changePasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordRepeat(e.currentTarget.value);

  const handleUpdateUser = async () => {
    try {
      await updateUser(email, name, password, passwordRepeat);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      setShowDeleteProfileModal(false);
      navigate(Routes.mainPage);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then((fetchedUser) => {
        if (fetchedUser === null) return;

        setEmail(fetchedUser.email);
        setName(fetchedUser.name);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <DefaultPageLayout>
      <Container className="mt-5 d-flex w-50 align-content-center flex-wrap">
        <Stack direction="vertical" className="d-flex align-items-center">
          <h2 className="header">Добро пожаловать, {name}</h2>
          <Container>
            <Form>
              <FormGroup className="mb-2" controlId="formName">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  value={name}
                  onChange={changeName}
                  type="text"
                  placeholder="Имя или ник"
                />
              </FormGroup>
              <FormGroup className="mb-2" controlId="formEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control
                  value={email}
                  onChange={changeEmail}
                  type="email"
                  placeholder="Ваша почта"
                />
              </FormGroup>
              <FormGroup className="mb-2" controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  className="mb-2"
                  value={password}
                  onChange={changePassword}
                  type="password"
                  placeholder="Введите новый пароль"
                />
                <Form.Control
                  className="mb-2"
                  value={passwordRepeat}
                  onChange={changePasswordRepeat}
                  type="password"
                  placeholder="Подтвердите новый пароль"
                />
              </FormGroup>
            </Form>
          </Container>

          <Button
            className="mt-2"
            type="submit"
            as="input"
            value="Сохранить"
            onClick={handleUpdateUser}
          />
          <Button
            className="mt-2"
            type="submit"
            as="input"
            variant="danger"
            value="Удалить профиль"
            onClick={() => setShowDeleteProfileModal(true)}
          />
        </Stack>
      </Container>

      <ModalDeleteProfile
        show={showDeleteProfileModal}
        onHide={() => setShowDeleteProfileModal(false)}
        onDelete={handleDeleteUser}
      />
    </DefaultPageLayout>
  );
}
