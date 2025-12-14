import Funcionarios from './components/funcionarios/Funcionarios'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Funcionarios />
      <Toaster />
    </div>
  )
}

export default App
