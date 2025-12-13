import Funcionarios from './components/funcionarios/Funcionarios'
import Navbar from './components/global/Navbar'
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Funcionarios />
      <Toaster />
    </div>
  )
}

export default App
