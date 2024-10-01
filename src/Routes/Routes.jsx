import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import NotFound from "../Shared/NotFound/NotFound.tsx";
import HomePage from "../Modules/HomePage/HomePage";
<<<<<<< HEAD
import Login from "../Modules/CommunityPortal/Auth/Login";
=======
import DeveloperPage from "../Shared/Developers/Developer.tsx";

>>>>>>> origin/main
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
<<<<<<< HEAD
      path: "/login",
      element: <Login />,
      
=======
        path: "/developers",
        element: <DeveloperPage />,
>>>>>>> origin/main
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
