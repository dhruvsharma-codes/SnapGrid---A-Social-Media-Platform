import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import {
//   GoogleOAuthProvider,
// } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <GoogleOAuthProvider
    clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID
      }
    > */}

    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
        <App />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
    {/* </GoogleOAuthProvider> */}
    
  </StrictMode>,
);
