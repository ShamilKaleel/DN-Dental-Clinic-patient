import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./Layout";
import BookingPage from "./pages/BookingPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookingFormPage from "./pages/BookingFormPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import MyBookingPage from "./pages/MyBookingPage";
import { motion, AnimatePresence } from "framer-motion";

export function withPageTransition(Component) {
  return function PageTransition(props) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Component {...props} />
      </motion.div>
    );
  };
}

// Update your App.js to use these components:
export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: withPageTransition(AboutPage)() },
        { path: "services", element: withPageTransition(ServicesPage)() },
        { path: "contact", element: withPageTransition(ContactPage)() },
        { path: "booking", element: withPageTransition(BookingPage)() },
        { path: "booking/:id", element: withPageTransition(BookingFormPage)() },
        {
          path: "booking/submit/:id/:contactNumber",
          element: withPageTransition(ConfirmationPage)(),
        },
        { path: "myBooking", element: withPageTransition(MyBookingPage)() },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
