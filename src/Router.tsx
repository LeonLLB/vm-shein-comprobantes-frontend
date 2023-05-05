import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import CargarPedido from './pages/CargarPedido'

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/cargar" element={<CargarPedido/>}/>
            {/*<Route path="/pedidos" element={}/>
            <Route path="/editar/:queryParam" element={}/> */}
        </Routes>
    </Router>
  )
}

export default AppRouter