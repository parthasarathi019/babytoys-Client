import "aos/dist/aos.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
