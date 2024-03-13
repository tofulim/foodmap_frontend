import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
