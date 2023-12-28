import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
