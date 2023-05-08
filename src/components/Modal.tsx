import { ReactNode, forwardRef } from "react"

interface ModalProps{
    interaction:()=>void,
    onConfirmClick?: ()=>void,
    onCancelClick?: ()=>void,
    title:string,
    children: ReactNode,
    isDanger?: boolean,
    cancelText?: string,
    confirmText?: string,
}

const Modal = forwardRef<HTMLDivElement,ModalProps>(({interaction,title,isDanger = false, cancelText = 'Cancelar', confirmText = 'Confirmar',children,onCancelClick=()=>{},onConfirmClick=()=>{}},ref)=> {
  return (
    <div ref={ref} className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className={"modal-title "+isDanger?"text-danger":''}>{title}</h5>
                <button type="button" className="btn-close" onClick={interaction} aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={()=>{onCancelClick();interaction()}}>{cancelText}</button>
                <button type="button" className={isDanger?"btn btn-danger":"btn btn-primary"} onClick={()=>{onConfirmClick();interaction()}}>{confirmText}</button>
            </div>
            </div>
        </div>
        </div>
  )
})

export default Modal