import "./app.css";
import React, { ReactComponentElement, ReactElement, useState } from "react";
import ReactDOM from "react-dom/client";
import { Background } from "./components/Background";
import {
    BrowserRouter,
    createBrowserRouter,
    Link,
    RouterProvider
} from "react-router-dom";
import { Home } from "./routes/home";
import { WebConsole } from "./routes/console";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/console",
        element: <WebConsole />
    }
]);

const App = () => {
    return (
        <>
            <header>
                <h1 id="title" className="text-4xl p-4 font-bold">
                    MPP User Archive
                </h1>
                {/* <nav id="navbar" className="items-end justify-end">
                    <ul>
                        <Link to="/">Home</Link>
                    </ul>
                </nav> */}
            </header>
            <div
                id="content"
                className="flex-1 h-full bg-zinc-950 m-4 p-4 rounded-2xl"
            >
                {/* <div className="container min-w-full"> */}
                <RouterProvider router={router} />
                {/* </div> */}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as NonNullable<HTMLElement>
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

document.body.classList.add(
    "bg-black",
    "text-zinc-300",
    "justify-center",
    "min-h-screen"
);

document
    .getElementById("root")
    ?.classList.add("min-h-screen", "flex", "flex-col", "p-10");
