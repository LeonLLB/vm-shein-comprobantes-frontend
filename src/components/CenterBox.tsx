import { FC, ReactNode } from "react"

interface CenterBoxProps{
    children: ReactNode
}

const CenterBox: FC<CenterBoxProps> = ({children}) => {
  return (
    <div className="vw-100 vh-100">
        <div className="h-100 d-flex flex-row justify-content-center">
            <div className="d-flex flex-column justify-content-center">
                {children}
            </div>
        </div>
    </div>
  )
}

export default CenterBox