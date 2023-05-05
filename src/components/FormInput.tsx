import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react'

interface  FormInputProps{
    label:string,
    name:string,
    value:string,
    onChange:(n:string,v:string)=>void,
    type?:HTMLInputTypeAttribute
}

const FormInput: FC<FormInputProps> = ({label,name,onChange,value,type="text"}) => {

    const onInputChange=(e:ChangeEvent<HTMLInputElement>)=>onChange(e.target.name,e.target.value)

  return (
    <div>
        <label className='form-label' htmlFor={name}>{label}:</label>
        <input onChange={onInputChange} type={type} name={name} id={name} className="form-control" value={value}/>
    </div>
  )
}

export default FormInput