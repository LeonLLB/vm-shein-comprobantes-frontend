import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import CargarPedido from './pages/CargarPedido'
import Pedidos from './pages/Pedidos'
import EditarPedido from './pages/EditarPedido'

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/cargar" element={<CargarPedido/>}/>
            <Route path="/pedidos" element={<Pedidos/>}/>
            <Route path="/editar/:cotizacion" element={<EditarPedido/>}/>
        </Routes>
    </Router>
  )
}

export default AppRouter