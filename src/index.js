import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from "./context/ProductProvider.jsx";
import { DataProvider } from "./context/DataProvider";
import { AuthProvider } from "./context/AuthContext";

// console.log(ProductProvider);

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <DataProvider>
                        <App />
                    </DataProvider>
                </ProductProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
