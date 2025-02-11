import React from "react"

type Input = {
  textKey: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Input> = ({ textKey, type, name, value, onChange }) => {

  return(
    <div>
      <div>
        <label htmlFor="">{textKey}</label>
      </div>
      <input type={type} name={name} value={value} onChange={onChange}/>
    </div>
  )
}
