import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            {/* <Route path="/cargar" element={}/>
            <Route path="/pedidos" element={}/>
            <Route path="/editar/:queryParam" element={}/> */}
        </Routes>
    </Router>
  )
}

export default AppRouter