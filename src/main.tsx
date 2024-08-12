import "./styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/route.tsx";
import { UserProvider } from "./context/user-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <AppRouter />
    </UserProvider>
  </React.StrictMode>
);
