import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";
import OrderCreate from "./components/orders/OrderCreate";
import ModelIndex from "./components/models/ModelIndex";

// Lazy-loaded components
const Home = lazy(() => import("./components/routes/Home"));
const Login = lazy(() => import("./components/routes/Login"));
const Register = lazy(() => import("./components/routes/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/m",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ModelIndex />
      </Suspense>
    ),
  },
  {
    path: "/o/create",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <OrderCreate />
      </Suspense>
    ),
  },
  {
    path: "/a/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/a/register",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Register />
      </Suspense>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
