import { Nav } from "react-bootstrap";
import Routes from "../../app/routes";

export default function Sidebar() {
  return (
    <>
      <Nav className="flex-column">
        <Nav.Link href={Routes.myProfile}>Мой профиль</Nav.Link>
        <Nav.Link href={Routes.myBooks}>Мои книги</Nav.Link>
        <Nav.Link href={Routes.bookAdd}>Добавить книгу</Nav.Link>
        <Nav.Link href={Routes.favorites}>Избранное</Nav.Link>
        <Nav.Link href={Routes.myComments}>Мои комментарии</Nav.Link>
      </Nav>
    </>
  );
}
