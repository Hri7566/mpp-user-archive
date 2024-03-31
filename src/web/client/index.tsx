import "./app.css";
import React from "react";
import ReactDOM from "react-dom/client";
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
                <a id="title" className="text-4xl p-4 font-bold" href="/">
                    MPP User Archive
                </a>
                {/* <nav id="navbar" className="items-end justify-end">
                    <ul>
                        <Link to="/">Home</Link>
                    </ul>
                </nav> */}
            </header>
            <div
                id="content"
                className="flex-1 h-full bg-[#ffffff05] m-4 p-4 rounded-2xl shadow-md ring-1 ring-inset ring-[#ffffff08]"
            >
                {/* <div className="container min-w-full"> */}
                <RouterProvider router={router} />
                {/* </div> */}
            </div>
            <footer className="text-lg">
                &copy;{" "}
                <a href="https://hri7566.info" className="text-[#8d3f50]">
                    Hri7566
                </a>{" "}
                2023 All rights reserved
            </footer>
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
    "bg-stone-950",
    "text-zinc-300",
    "justify-center",
    "min-h-screen"
);

document
    .getElementById("root")
    ?.classList.add("min-h-screen", "flex", "flex-col", "p-10");
