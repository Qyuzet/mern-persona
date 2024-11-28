// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="286094758377-e5mph1f69sdm2piu9v7ca7ifj7vqcc1c.apps.googleusercontent.com">
        <Toaster />
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
