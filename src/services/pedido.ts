import { CommonError, ValidationError } from "../interfaces/error"
import { PedidoDTO } from "../interfaces/pedido"

class PedidoService{

    private apiUrl = import.meta.env.DEV ? 'http://localhost:3000/api' : '/api'

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
}

export const pedidoService = new PedidoService()