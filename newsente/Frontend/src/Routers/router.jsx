
import {
  createBrowserRouter,
} from "react-router-dom";


import App from '../App.jsx'
import About from '../pages/Home/About/About.jsx'
import Contact from '../pages/Home/Contact/Contact.jsx'
import Main from '../pages/Home/Main/Main.jsx'
import LoginPage from '../pages/Home/LoginPage/LoginPage.jsx';

import RegisterPage from '../pages/Home/RegisterPage/RegisterPage.jsx';
import Ar_Ge from '../pages/Home/Ar_Ge/Ar_Ge.jsx';
import Services from '../pages/Home/Services/Services.jsx';
import Covid_19 from '../pages/Home/Covid_19/Covid_19.jsx';
import Error404 from "../components/Error404/Error404.jsx";
import UserPageLayout from "../pages/Order/User/UserPageLayout/UserPageLayout.jsx";
import UserDashboard from "../pages/Order/User/UserDashboard/UserDashboard.jsx";
import AdminPageLayout from "../pages/Order/Admin/AdminPageLayout/AdminPageLayout.jsx";
import AdminDashboard from "../pages/Order/Admin/AdminDashboard/AdminDashboard.jsx";
// import UserPage from "../pages/Order/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the static layout (Header and Footer)
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/Ar-Ge",
        element: <Ar_Ge />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/covid_19_test",
        element: <Covid_19 />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/user/:id",
    element: <UserPageLayout />, // Layout specific to user dashboard
    errorElement: <Error404 />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      // { path: "profile", element: <UserProfile /> },
      // { path: "settings", element: <UserSettings /> },
    ],
  },
  {
    path: "/admin/:id",
    element: <AdminPageLayout />, // Layout specific to admin dashboard
    errorElement: <Error404 />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      // { path: "users", element: <UserManagement /> },
      // { path: "settings", element: <AdminSettings /> },
    ],
  }


  ,]


);



export default router;
