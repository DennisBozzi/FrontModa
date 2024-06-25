import { ThemeProvider } from "./components/dark-mode/theme-provider"
import { ModeToggle } from "./components/dark-mode/mode-toggle"
import { Login } from "./screens/Login"

export function App() {
  return (
    <>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
        <Login></Login>
      </ThemeProvider>
    </>
  )
}

