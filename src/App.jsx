import AppContent from "./AppContent"
import { ContextProvider } from "./assets/context-variables/ContextVariables"

function App() {

  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  )
}

export default App
