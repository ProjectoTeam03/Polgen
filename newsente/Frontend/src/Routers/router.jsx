import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import About from "../pages/Home/About/About.jsx";
import Contact from "../pages/Home/Contact/Contact.jsx";
import Main from "../pages/Home/Main/Main.jsx";
import LoginPage from "../pages/Home/LoginPage/LoginPage.jsx";
import RegisterPage from "../pages/Home/RegisterPage/RegisterPage.jsx";
import Ar_Ge from "../pages/Home/Ar_Ge/Ar_Ge.jsx";
import Services from "../pages/Home/Services/Services.jsx";
import Covid_19 from "../pages/Home/Covid_19/Covid_19.jsx";
import Error404 from "../components/shared/Error404/Error404.jsx";
import UserPageLayout from "../pages/Order/User/UserPageLayout/UserPageLayout.jsx";
import UserDashboard from "../pages/Order/User/UserDashboard/UserDashboard.jsx";
import AdminPageLayout from "../pages/Order/Admin/AdminPageLayout/AdminPageLayout.jsx";
import AdminDashboard from "../pages/Order/Admin/AdminDashboard/AdminDashboard.jsx";
import ProtectedRoute from "../components/shared/ProtectedRoute/ProtectedRoute";
import ForgotPassword from "../components/HomeComponent/Forgot_password/ForgotPassword.jsx";
import ResetPassword from "../components/HomeComponent/Reset_Password/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Main /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot_password", element: <ForgotPassword /> },
      { path: "reset_password/:token", element: <ResetPassword /> },
      { path: "register", element: <RegisterPage /> },
      { path: "Ar-Ge", element: <Ar_Ge /> },
      { path: "services", element: <Services /> },
      { path: "covid_19_test", element: <Covid_19 /> },
    ],
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoute>
        <UserPageLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <UserDashboard /> }, // Matches "/user/:id"
      { path: "dashboard", element: <UserDashboard /> }, // Matches "/user/:id/dashboard"
    ],
  },
  {
    path: "/admin/:id",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPageLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> }, // Matches "/admin/:id"
      { path: "dashboard", element: <AdminDashboard /> }, // Matches "/admin/:id/dashboard"
    ],
  },
]);

export default router;

