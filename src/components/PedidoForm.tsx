import { FC, FormEvent, useState } from 'react'
import CenterBox from './CenterBox'
import { useNavigate } from 'react-router-dom'
import FormInput from './FormInput'
import { Pedido, PedidoDTO } from '../interfaces/pedido'

interface PedidoFormProps{
    onSubmitFunc:(data:PedidoDTO)=>void
    submitMsg:string,
    formTitle:string
    routeToNavigate:string
    routeBtnMsg: string
    dataToPreload?: Pedido
}

const PedidoForm: FC<PedidoFormProps> = ({onSubmitFunc,formTitle,routeBtnMsg,routeToNavigate,submitMsg,dataToPreload}) => {
  
	const navigate = useNavigate()

	const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState((dataToPreload)?dataToPreload.productos.length<2:true)

	const defaultProductoForm = {
		link:'',
		talla:'',
		color:'',
		cantidad:'',
		precioUnitario:''
	}

	const [clienteForm, setClienteForm] = useState((dataToPreload)?{...dataToPreload.cliente}:{
		nombre:'',
		apellido:'',
		telefono:''
	})

	const onClienteValueChange = (name:string,value:string) => setClienteForm({
		...clienteForm,
		[name]:value
	})

	const [productosForm, setProductosForm] = useState(
        (dataToPreload)
        ? dataToPreload.productos.map(producto=>({...producto,cantidad:producto.cantidad.toString(),precioUnitario:producto.precioUnitario.toString()}))
        : [{...defaultProductoForm}]
    )

	const addProductoToForm = () => {
		setIsRemoveButtonDisabled(false)
		setProductosForm([
			...productosForm,
			{...defaultProductoForm}
		])
	}

	const changeRemoveButtonStatus = (productosForm: any[]) => productosForm.length === 1 ? setIsRemoveButtonDisabled(true) : setIsRemoveButtonDisabled(false)

	const removeProductoFromForm = (index: number) => {
		const newProductosForm = productosForm.filter((_,i)=>i!==index)
		changeRemoveButtonStatus(newProductosForm)
		setProductosForm(newProductosForm)
	}

	const onProductValueChange = (name:"link"|"talla"|"color"|"cantidad"|"precioUnitario",value:string,index:number) => {
		const newProductoForm = [...productosForm]
		newProductoForm[index][name] = value
		setProductosForm([...newProductoForm])
	}	

	const onSubmit = (e:FormEvent) => {
		e.preventDefault()
		const fechaEmision = new Date()
		const fecha = {
			year:fechaEmision.getFullYear(),
			month:fechaEmision.getMonth()+1 < 10 ? `0${fechaEmision.getMonth()+1}` : fechaEmision.getMonth()+1,
			date:fechaEmision.getDate() < 10 ? `0${fechaEmision.getDate()}` : fechaEmision.getDate(),
		}

		onSubmitFunc({
			fecha:`${fecha.year}-${fecha.month}-${fecha.date}`,
			horaMinutosEmision:+(`${fechaEmision.getHours()}${fechaEmision.getMinutes()}`),
			cliente:{...clienteForm},
			productos:productosForm.map(producto=>({
				...producto,
				cantidad:+producto.cantidad,
				precioUnitario:+producto.precioUnitario
			}))
		})

	}

	return (
		<CenterBox>
			<form onSubmit={onSubmit} className="my-5 space-y-2">
				<h3 className="text-center">{formTitle}</h3>
				<fieldset className="bg-secondary p-2 rounded">
					<legend>Datos del cliente</legend>
					<div className="d-flex flex-row space-x-4">
						{/* NOMBRE Y APELLIDO */}
						<FormInput label="Nombre" name="nombre" value={clienteForm.nombre} onChange={onClienteValueChange}/>
						<FormInput label="Apellido" name="apellido" value={clienteForm.apellido} onChange={onClienteValueChange}/>
					</div>
					<div className="">
						{/* TELEFONO */}
						<FormInput label="Telefono" type="tel" name="telefono" value={clienteForm.telefono} onChange={onClienteValueChange}/>
					</div>
				</fieldset>
				<fieldset className="bg-secondary p-2 rounded">
					<legend>Datos de los productos</legend>
					<div style={{height:'12.5rem'}} className="space-y-4 overflow-auto">
					{productosForm.map((_,i)=>(
						<div style={{width:'90%'}} className="p-2 card container space-y-2" key={i}>
							<div className="row">
								<div className="col">
									<FormInput label="Link de Shein" name={"link"+i} value={productosForm[i].link} onChange={(_,v)=>onProductValueChange("link",v,i)}/>
								</div>
								<div className="col">
									<FormInput label="Talla" name={"talla"+i} value={productosForm[i].talla} onChange={(_,v)=>onProductValueChange("talla",v,i)}/>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<FormInput label="Color" name={"color"+i} value={productosForm[i].color} onChange={(_,v)=>onProductValueChange("color",v,i)}/>
								</div>
								<div className="col">
									<FormInput label="Cantidad" type="number" name={"cantidad"+i} value={productosForm[i].cantidad} onChange={(_,v)=>onProductValueChange("cantidad",v,i)}/>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<FormInput label="Precio Unitario ($)" name={"precioUnitario"+i} value={productosForm[i].precioUnitario} onChange={(_,v)=>onProductValueChange("precioUnitario",v,i)}/>
								</div>
								<div className="col">
									<button type="button" disabled={isRemoveButtonDisabled} onClick={()=>removeProductoFromForm(i)} className="w-100 btn btn-danger">Quitar producto</button>
								</div>
							</div>
						</div>
					))}
					</div>
					<button type="button" onClick={addProductoToForm} className="my-2 w-100 btn btn-primary">Añadir producto</button>
				</fieldset>
				<div className="container">
					<div className="row space-x-4">
						<div className="col">
							<button type="submit" className=" btn btn-primary w-100">{submitMsg}</button>
						</div>
						<div className="col">
							<button onClick={()=>navigate(routeToNavigate)} className=" btn btn-primary w-100">{routeBtnMsg}</button>
						</div>
					</div>
				</div>
			</form>
		</CenterBox>
	)
}

export default PedidoForm