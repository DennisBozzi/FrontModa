import { ThemeProvider } from "./components/dark-mode/theme-provider"
import { ModeToggle } from "./components/dark-mode/mode-toggle"
import { Login } from "./screens/Login"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const client = new QueryClient();

export function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <ModeToggle></ModeToggle>
          <Login></Login>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

