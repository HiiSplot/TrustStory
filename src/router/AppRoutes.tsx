import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Stories } from "../pages/Stories";
import { SignUp } from "../pages/SignUp";
import { Profil } from "../pages/Profil";
import { Categories } from "../pages/Categories";


export const router = createBrowserRouter([
  { path: "/", element: <Stories /> },
  { path: "/login", element: <Login /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/stories", element: <Stories /> },
  { path: "/profil/:userId", element: <Profil /> },
  { path: "/categories", element: <Categories /> }
])
