import AuthProvider from "./hooks/useAuth";
import { Login } from "./screens/Login"
import { HomePage } from "./screens/HomePage"
import { Produtos } from "./screens/Produtos";
import { Vendas } from "./screens/Vendas";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";
import { IsLoggedRoute, LoginRoute } from "@/components/ProtectedRoute";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./components/contexts/cartContext";


const router = createBrowserRouter([
  {
    path: "/*", element: (<LoginRoute><Login /></LoginRoute>)
  },
  {
    path: "/Home", element: (<IsLoggedRoute><HomePage /></IsLoggedRoute>)
  },
  {
    path: "/Produtos", element: (<IsLoggedRoute><Produtos /></IsLoggedRoute>)
  },
  {
    path: "/Vendas", element: (<IsLoggedRoute><Vendas /></IsLoggedRoute>)
  },
]);

export function App() {

  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <TooltipProvider>
              <RouterProvider router={router} >
              </RouterProvider>
            </TooltipProvider>
            <Toaster />
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

