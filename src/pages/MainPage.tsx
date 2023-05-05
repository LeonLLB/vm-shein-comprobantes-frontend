import { useNavigate } from "react-router-dom"
import CenterBox from "../components/CenterBox"

const MainPage = () => {

  const navigate = useNavigate()

  const goToCargar = () => navigate('/cargar')
  const goToPedidos = () => navigate('/pedidos')

  return (
    <CenterBox>
      <div className="container d-flex flex-column space-y-4">
        <img width="250rem" height="250rem" className="img-thumbnail rounded" src="/logo.jpg" alt="Venemexi Fashion Logo" />
        <button onClick={goToCargar} type="button" className="btn btn-primary">Cargar pedido</button>
        <button onClick={goToPedidos} type="button" className="btn btn-primary">Ver pedidos</button>
      </div>
    </CenterBox>
  )
}

export default MainPage