import modal from "bootstrap/js/dist/modal"
import { useRef, useState } from "react"


export const useBsModal = () => {
    const modalRef = useRef<HTMLDivElement>(null)

    const [isShowing, setIsShowing] = useState(false)
    
    
    const getBsModalInstance = () => {
        const instance = modal.getOrCreateInstance(modalRef.current!,{
            backdrop:'static',
            keyboard:true
        })
        return instance
    }

    const modalInteraction = () => {
        if(isShowing){
            setIsShowing(false)
            getBsModalInstance().hide()
        } else {
            setIsShowing(true)
            getBsModalInstance().show()
        }
    }

    return {modalRef,modalInteraction}
    

}