import "./app.css";
import React, { ReactComponentElement, ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";
import { Background } from "./components/Background";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as NonNullable<HTMLElement>
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
