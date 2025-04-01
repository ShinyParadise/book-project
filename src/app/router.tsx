import { createBrowserRouter } from "react-router-dom";
import AddBook from "../presentation/pages/books/AddBook";
import Login from "../presentation/pages/auth/Login";
import MainPage from "../presentation/pages/MainPage";
import NotFoundPage from "../presentation/pages/NotFoundPage";
import MyProfile from "../presentation/pages/MyProfile";
import SignUp from "../presentation/pages/auth/SignUp";
import AddChapter from "../presentation/pages/chapters/AddChapter";
import MyComments from "../presentation/pages/MyComments";
import MyBooks from "../presentation/pages/books/MyBooks";
import Favorites from "../presentation/pages/Favorites";
import BookPage from "../presentation/pages/books/BookPage";
import Routes from "./routes";
import EditBook from "../presentation/pages/books/EditBook";
import EditBookChapters from "../presentation/pages/chapters/EditBookChapters";
import EditChapter from "../presentation/pages/chapters/EditChapter";
import ReadChapter from "../presentation/pages/chapters/ReadChapter";
import AuthorPage from "../presentation/pages/AuthorPage";
import PrivacyPolicy from "../presentation/pages/PrivacyPolicyPage";
import SearchPage from "../presentation/pages/SearchPage";

const router = createBrowserRouter([
  {
    path: Routes.mainPage,
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: Routes.login,
    element: <Login />,
  },
  {
    path: Routes.signup,
    element: <SignUp />,
  },
  {
    path: Routes.bookpage,
    element: <BookPage />,
  },
  {
    path: Routes.bookAdd,
    element: <AddBook />,
  },
  {
    path: Routes.bookEdit,
    element: <EditBook />,
  },
  {
    path: Routes.myProfile,
    element: <MyProfile />,
  },
  {
    path: Routes.author,
    element: <AuthorPage />,
  },
  {
    path: Routes.chapterAdd,
    element: <AddChapter />,
  },
  {
    path: Routes.chapterEdit,
    element: <EditChapter />,
  },
  {
    path: Routes.myComments,
    element: <MyComments />,
  },
  {
    path: Routes.myBooks,
    element: <MyBooks />,
  },
  {
    path: Routes.favorites,
    element: <Favorites />,
  },
  {
    path: Routes.bookChaptersEdit,
    element: <EditBookChapters />,
  },
  {
    path: Routes.chapterRead,
    element: <ReadChapter />,
  },
  {
    path: Routes.policy,
    element: <PrivacyPolicy />,
  },
  {
    path: Routes.search,
    element: <SearchPage />,
  },
]);

export default router;
