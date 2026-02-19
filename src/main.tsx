import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllChampions from "./pages/AllChampions";
import OneChampion from "./pages/OneChampion";
import EditChampion from "./pages/EditChampion";
import NewChampion from "./pages/NewChampion";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://7bdbbdf923a2c175666143bca1496724@o4510912025722880.ingest.de.sentry.io/4510912042827856",
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllChampions />} />
        <Route path="/one-champion/:id" element={<OneChampion />} />
        <Route path="/edit-champion/:id" element={<EditChampion />} />
        <Route path="/new-champion" element={<NewChampion />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
