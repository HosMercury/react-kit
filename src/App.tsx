import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/routes/Login";
import Register from "./components/routes/Register";

let router = createBrowserRouter([
  {
    path: "/a/login",
    element: <Login />,
  },
  {
    path: "/a/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
