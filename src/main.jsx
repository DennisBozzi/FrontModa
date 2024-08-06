import React from 'react'
import './css/globals.css'
import './css/style.css'
import { App } from './App'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "./components/dark-mode/theme-provider"
import { ModeToggle } from "./components/dark-mode/mode-toggle"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <ModeToggle></ModeToggle>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
