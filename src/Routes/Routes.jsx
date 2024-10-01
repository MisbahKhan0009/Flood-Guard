import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import NotFound from "../Shared/NotFound/NotFound.tsx";
import HomePage from "../Modules/HomePage/HomePage";
import Login from "../Modules/CommunityPortal/Auth/Login";
import DeveloperPage from "../Shared/Developers/Developer.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/developers", element: <DeveloperPage /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
