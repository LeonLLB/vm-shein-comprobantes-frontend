interface ClienteDTO{
    nombre:string

    apellido: string

    telefono: string
}

interface ProductoDTO{
    link: string

    talla: string

    nombre: string

    cantidad: number

    precioUnitario:number

    envioUnitario:number
}

export interface PedidoDTO{
    fecha: string

    horaMinutosEmision: number

    conImpuesto: boolean

    cliente: ClienteDTO

    productos: ProductoDTO[]
}

interface Cliente{
    id:number

    nombre:string

    apellido: string

    telefono: string
}

interface Producto{
    id: number

    link: string

    nombre: string

    talla: string

    cantidad: number

    precioUnitario:number
    
    envioUnitario:number
}

export interface Pedido{
    id: number
    fecha: string
    conImpuesto: boolean
    
    horaMinutosEmision: number

    cotizacion: string

    cliente: Cliente

    productos: Producto[]
}