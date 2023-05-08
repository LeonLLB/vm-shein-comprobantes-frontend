import { useEffect, useState } from "react"
import CenterBox from "../components/CenterBox"
import { pedidoService } from "../services/pedido"
import cogoToast from "cogo-toast"
import { useNavigate } from "react-router-dom"
import { Pedido } from "../interfaces/pedido"


const Pedidos = () => {

	const [pedidos, setPedidos] = useState<Pedido[]>([])
	const navigate = useNavigate()

	const preparePhoneNumber = (phoneNumber: string) => {
		const phoneTmp = phoneNumber.split('')
		phoneTmp.shift()
		return phoneTmp.join('')
	}

	useEffect(() => {
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
	}, [])


	return (
		<CenterBox>
			<div className="container space-y-2">
				<div className="row">
					<span className="col">
						<h3>Últimos pedidos en sistema</h3>
					</span>
					<span className="col">
						<button className="btn btn-primary">Cargar pedido</button>
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
														<a target="_blank" href={producto.link}>Producto en Shein: {producto.talla} {producto.color} {producto.cantidad} unidad(es) ${producto.precioUnitario}</a>
													</li>
												))}
											</ol>
										</td>
										<td>
											<div className="d-flex flex-column space-y-2 align-items-center w-100 ">
												<button type="button" className="btn btn-primary"> <i className="bi-pencil-square"></i> Editar</button>
												<button type="button" className="btn btn-danger"> <i className="bi-trash"></i> Eliminar</button>
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
	)
}

export default Pedidos