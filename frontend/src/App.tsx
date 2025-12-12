import Funcionarios from './components/funcionarios/Funcionarios'
import Navbar from './components/global/Navbar'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Funcionarios />
    </div>
  )
}

export default App
