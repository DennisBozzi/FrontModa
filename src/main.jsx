import React from 'react'
import './css/globals.css'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "./components/dark-mode/theme-provider"
import { ModeToggle } from "./components/dark-mode/mode-toggle"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./screens/Login"
import { Home } from "./screens/Home"

const router = createBrowserRouter([
  { path: "/*", element: <Login /> },
  { path: "/Home", element: <Home /> },
]);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
