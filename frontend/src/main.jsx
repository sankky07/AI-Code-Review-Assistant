import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <>
            <App />
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#0f172a",
                        color: "#fff",
                        border: "1px solid #334155"
                    }
                }}
            />
        </>

    </React.StrictMode>

);