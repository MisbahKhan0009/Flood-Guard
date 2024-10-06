import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import { WeatherProvider } from "./context/WeatherProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.StrictMode>
      <WeatherProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WeatherProvider>
    </React.StrictMode>
  </React.StrictMode>
);
