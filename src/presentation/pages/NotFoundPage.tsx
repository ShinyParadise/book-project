import { Link } from "react-router-dom";
import Routes from "../../app/routes";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-4">
      <p> 404 Not Found </p>
      <Link to={Routes.mainPage}>Главная страница</Link>
    </div>
  );
}
