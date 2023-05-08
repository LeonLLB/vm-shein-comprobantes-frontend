import cogoToast from "cogo-toast";
import { useNavigate, useParams } from "react-router-dom";
import PedidoForm from "../components/PedidoForm";
import { Pedido, PedidoDTO } from "../interfaces/pedido";
import { pedidoService } from "../services/pedido";
import { useEffect, useState } from "react";


const EditarPedido = () => {

    const [didSuccesfullLoad, setDidSuccesfullLoad] = useState(false)
    const [data,setData] = useState<Pedido | null>(null)
  
	const navigate = useNavigate()
    const {cotizacion} = useParams()

	const onSubmit = (dataToSubmit: PedidoDTO) => {
        if(!cotizacion){navigate('/');return}
		pedidoService.editar(cotizacion,dataToSubmit)
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

    useEffect(()=>{
        if(!cotizacion) {
            navigate('/')
            return
        }
        const toast = cogoToast.loading("Obteniendo la información del pedido...")
        pedidoService.getOne(cotizacion)
        .then(pedido=>{
            toast.hide!()
            if(!pedido){
                cogoToast.error('No existe ese pedido')
                navigate('/')
                return
            }
            setData(pedido)
            setDidSuccesfullLoad(true)
        })
    },[])

  return (
    <>
        {(didSuccesfullLoad && data) && <PedidoForm
            onSubmitFunc={onSubmit} 
            submitMsg={"Editar pedido"}
            formTitle={"Editar pedido: "+cotizacion}
            routeToNavigate={"/pedidos"}
            routeBtnMsg={"Ir a la pagína de los pedidos"}
            dataToPreload={data}
        />}
    </>
  )
}

export default EditarPedido