interface ClienteDTO{
    nombre:string

    apellido: string

    telefono: string
}

interface ProductoDTO{
    link: string

    talla: string

    color: string

    cantidad: number

    precioUnitario:number
}

export interface PedidoDTO{
    fecha: string

    horaMinutosEmision: number

    cliente: ClienteDTO

    productos: ProductoDTO[]
}