import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "@/components/ui/toaster";
import AppRoutes from "./routes/Router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <AppRoutes />
  </BrowserRouter>
);
