import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import NotFound from "../Shared/NotFound/NotFound.tsx";
import HomePage from "../Modules/HomePage/HomePage";
import Login from "../Modules/CommunityPortal/Auth/Login";
import DeveloperPage from "../Shared/Developers/Developer.tsx";
import Signup from "../Modules/CommunityPortal/Auth/SignUp.jsx";
import CommunityHome from "../Modules/CommunityPortal/CommunityHome.jsx";
import RescueHome from "../Modules/CommunityPortal/RescuePortal/RescueHome.jsx";
import VictimHome from "../Modules/CommunityPortal/VictimPortal/VictimHome.jsx";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import UpdateProfile from "../Modules/CommunityPortal/Auth/UpdateProfile.jsx";

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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/community-portal",
        element: <PrivateRoute />, // Protect the route
        children: [
          {
            path: "/community-portal",
            element: <CommunityHome />, // CommunityHome will only render if access is granted
          },
        ],
      },
      {
        path: "/rescue-portal",
        element: <RescueHome />,
      },
      {
        path: "/victim-portal",
        element: <VictimHome />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/developers",
        element: <DeveloperPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
