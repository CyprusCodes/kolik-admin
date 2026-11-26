import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "simplebar-react/dist/simplebar.min.css";
import "./global.css";
import App from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
