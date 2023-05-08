import cogoToast from "cogo-toast"
import PedidoForm from "../components/PedidoForm"
import { PedidoDTO } from "../interfaces/pedido"
import { pedidoService } from "../services/pedido"
import { useNavigate } from "react-router-dom"


const CargarPedido = () => {

	const navigate = useNavigate()

	const onSubmit = (data: PedidoDTO) => {
		pedidoService.cargar(data)
		.then(isOk=>{
            if(isOk){
                cogoToast.success('Pedido modificado con exito!');navigate('/pedidos')
                return
            }
            cogoToast.error('Ocurrio un error al editar el pedido')
        })
		.catch(err=>{
			const {message} = err

			if(message.includes('[')){
				const errorList = JSON.parse(message)

				cogoToast.error(<ul>
					{errorList.map((error:string)=><li>{error}</li>)}
				</ul>)
				return
			}
			cogoToast.error(message)
		})
	}

  return (
	<PedidoForm
		onSubmitFunc={onSubmit} 
		submitMsg={"Cargar pedido"}
		formTitle={"Cargar pedido"}
		routeToNavigate={"/"}
		routeBtnMsg={"Ir a la pagína principal"}
	/>
  )
}

export default CargarPedido