import { CommonError, ValidationError } from "../interfaces/error"
import { Pedido, PedidoDTO } from "../interfaces/pedido"

class PedidoService{

    private apiUrl = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api'

    private finishPostOrPutPedido(status:number,body:ValidationError[] | CommonError | {message:string}){
        if(status !== 200){
            console.log((body as any).length)
            if((body as ValidationError[]).length){
                const errorList: string[] = [];

                (body as ValidationError[]).forEach((err:ValidationError)=>{
                    if(err.constraints){
                        Object.values(err.constraints).forEach(constraint=>errorList.push(constraint))
                    }
                    err.children.map(subError=>{
                        if(subError.constraints){
                            Object.values(subError.constraints).forEach(constraint=>errorList.push(constraint))
                        }
                    })
                })
                throw new Error(JSON.stringify(errorList))
            }
            else if((body as CommonError).name){
                throw new Error((body as CommonError).message)
            }
            return false
        }
        return true
    }

    async cargar(data: PedidoDTO):Promise<boolean>{
        const res = await fetch(this.apiUrl+'/registrar-pedido',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const status = res.status
        const body : ValidationError[] | CommonError | {message:string} = await res.json()
        return this.finishPostOrPutPedido(status,body)
    }

    async editar(cotizacion:string,data: PedidoDTO):Promise<boolean>{
        const res = await fetch(this.apiUrl+'/editar-pedido/'+cotizacion,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        const status = res.status
        const body : ValidationError[] | CommonError | {message:string} = await res.json()
        return this.finishPostOrPutPedido(status,body)
    }

    async getAll(): Promise<Pedido[]>{
        const res = await fetch(this.apiUrl+'/pedidos')

        const status = res.status

        if(status === 400){
            return []
        }
        const data = await res.json()

        return data
    }

    async getOne(cotizacion:string): Promise<Pedido | null>{
        const res = await fetch(this.apiUrl+'/pedido/'+cotizacion)

        const status = res.status

        if(status === 400){
            return null
        }
        const data = await res.json()

        return data
    }

    async delete(cotizacion: string): Promise<boolean>{
        const res = await fetch(this.apiUrl+'/eliminar-pedido/'+cotizacion,{method:'DELETE'})

        return res.status === 200
    }

    getComprobanteURL(cotizacion:string):string{
        return this.apiUrl + '/comprobante/'+cotizacion
    }
}

export const pedidoService = new PedidoService()