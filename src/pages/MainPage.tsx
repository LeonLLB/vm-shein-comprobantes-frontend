import CenterBox from "../components/CenterBox"

const MainPage = () => {
  return (
    <CenterBox>
      <div className="container d-flex flex-column space-y-4">
        <img width="250rem" height="250rem" className="img-thumbnail rounded" src="/logo.jpg" alt="Venemexi Fashion Logo" />
        <button type="button" className="btn btn-primary">Cargar pedido</button>
        <button type="button" className="btn btn-primary">Ver pedidos</button>
      </div>
    </CenterBox>
  )
}

export default MainPage