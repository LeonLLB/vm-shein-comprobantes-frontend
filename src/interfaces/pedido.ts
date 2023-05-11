interface ClienteDTO{
    nombre:string

    apellido: string

    telefono: string
}

interface ProductoDTO{
    link: string

    talla: string

    cantidad: number

    precioUnitario:number

    envioUnitario:number
}

export interface PedidoDTO{
    fecha: string

    horaMinutosEmision: number

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

    talla: string

    cantidad: number

    precioUnitario:number
    
    envioUnitario:number
}

export interface Pedido{
    id: number
    fecha: string
    
    horaMinutosEmision: number

    cotizacion: string

    cliente: Cliente

    productos: Producto[]
}