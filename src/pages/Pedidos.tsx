import { useEffect, useState } from "react"
import CenterBox from "../components/CenterBox"
import { pedidoService } from "../services/pedido"
import cogoToast from "cogo-toast"
import { useNavigate } from "react-router-dom"
import { Pedido } from "../interfaces/pedido"
import { useBsModal } from "../hooks/useBsModal"
import Modal from "../components/Modal"


const Pedidos = () => {

	const [pedidoToDelete, setPedidoToDelete] = useState('')
	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const navigate = useNavigate()
	const { modalRef, modalInteraction } = useBsModal()
	
	const preparePhoneNumber = (phoneNumber: string) => {
		const phoneTmp = phoneNumber.split('')
		phoneTmp.shift()
		return phoneTmp.join('')
	}

	useEffect(() => {
		getPedidos()
	}, [])

	const getPedidos = () => {
		const toast = cogoToast.loading("Obteniendo los últimos pedidos")

		pedidoService.getAll().then(data => {
			if (data.length === 0) {
				toast.hide!()
				cogoToast.error('No hay pedidos pendientes')
				navigate('/')
				return
			}
			toast.hide!()
			setPedidos(data)
		})
	}

	const preparePedidoDelete = (cotizacion: string) => {
		setPedidoToDelete(cotizacion)
		modalInteraction()
	}

	const triggerDelete = () => {
		const toast = cogoToast.loading('Eliminando pedido')
		pedidoService.delete(pedidoToDelete)
		.then(isOk=>{
			toast.hide!()
			modalInteraction()
			if(isOk){
				cogoToast.success(`Pedido ${pedidoToDelete} eliminado con exito`)
				const newPedidoList = pedidos.filter(pedido=>pedido.cotizacion !== pedidoToDelete)
				setPedidos(newPedidoList)
			} else {
				cogoToast.error('No se pudo eliminar la cotización')
			}
			setPedidoToDelete('')
		})
	}

	return (
		<>
			<CenterBox>
				<div className="container space-y-2">
					<div className="row">
						<span className="col">
							<h3>Últimos pedidos en sistema</h3>
						</span>
						<span className="col">
							<button onClick={()=>navigate('/cargar')} className="btn btn-primary">Cargar pedido</button>
						</span>
					</div>
					<div className="row">
						<div className="col">
							<table className="table table-secondary table-striped">
								<thead>
									<tr>
										<td>Cotización</td>
										<td>Datos del cliente</td>
										<td>Productos solicitados</td>
										<td>Opciones</td>
									</tr>
								</thead>
								<tbody>
									{pedidos.map(pedido => (
										<tr key={pedido.cotizacion}>
											<td className="align-middle" title="Presione para generar el comprobante"> <a href={pedidoService.getComprobanteURL(pedido.cotizacion)}>{pedido.cotizacion}</a> </td>
											<td className="align-middle">
												<div className="container">
													<div className="row">
														<span className="col">{pedido.cliente.nombre}</span>
														<span className="col">{pedido.cliente.apellido}</span>
													</div>
													<div className="row">
														<a className="col text-center" href={`tel:+58${preparePhoneNumber(pedido.cliente.telefono)}`}>{pedido.cliente.telefono}</a>
													</div>
												</div>
											</td>
											<td className="w-25">
												<ol className="space-y-2">
													{pedido.productos.map(producto => (
														<li key={pedido.cotizacion + producto.id}>
															<a target="_blank" href={producto.link}>{producto.nombre} en Shein: {producto.talla} {producto.cantidad} unidad(es) ${producto.precioUnitario}</a>
														</li>
													))}
												</ol>
											</td>
											<td>
												<div className="d-flex flex-column space-y-2 align-items-center w-100 ">
													<button onClick={()=>navigate('/editar/'+pedido.cotizacion)} type="button" className="btn btn-primary"> <i className="bi-pencil-square"></i> Editar</button>
													<button onClick={()=>preparePedidoDelete(pedido.cotizacion)} type="button" className="btn btn-danger"> <i className="bi-trash"></i> Eliminar</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</CenterBox>
			<Modal 
				ref={modalRef}
				interaction={modalInteraction}
				title={"Eliminar pedido: "+pedidoToDelete}
				isDanger
				confirmText="Eliminar"
				onCancelClick={()=>setPedidoToDelete('')}
				onConfirmClick={()=>triggerDelete()}
			>
				<span>Estas seguro de querer eliminar este pedido? Esta acción es irreversible. Se aconseja generar el comprobante antes haciendo click al código de cotización</span>
			</Modal>
		</>
	)
}

export default Pedidos