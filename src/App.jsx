import { Login } from "./screens/Login"
import { Home } from "./screens/Home"
import AuthProvider from "./hooks/useAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { IsLoggedRoute, LoginRoute } from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/*", element: (<LoginRoute><Login /></LoginRoute>)
  },
  {
    path: "/Home", element: (<IsLoggedRoute><Home /></IsLoggedRoute>)
  },
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

