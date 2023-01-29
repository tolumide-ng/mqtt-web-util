import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./components/Page/Home";
import "./index.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <React.StrictMode>
        <div className={"appWrapper"}>
            <HomePage />
        </div>
    </React.StrictMode>,
);
