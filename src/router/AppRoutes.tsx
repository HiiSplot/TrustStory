import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Stories } from "../pages/Stories";
import { SignUp } from "../pages/SignUp";
import { Profil } from "../pages/Profil";
import { FavoriteStories } from "../pages/FavoriteStories";
import { Categories } from "../pages/Categories";


export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/stories", element: <Stories /> },
  { path: "/profil", element: <Profil /> },
  { path: "/favorites", element: <FavoriteStories /> },
  { path: "/categories", element: <Categories /> }
])
