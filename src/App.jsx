import { Login } from "./screens/Login"
import { Home } from "./screens/Home"
import AuthProvider from "./hooks/useAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";

const router = createBrowserRouter([
  { path: "/*", element: <Login /> },
  { path: "/Home", element: <Home /> },
]);

export function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

