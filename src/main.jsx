import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/Router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-right" />
    <AppRoutes />
  </BrowserRouter>
);
