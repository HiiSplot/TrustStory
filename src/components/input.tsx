import React from "react"

type Input = {
  textKey: string
  name: string
  type: string
  value: string
  min?: string
  max?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Input> = ({ textKey, type, name, value, min, max, onChange }) => {

  return(
    <div style={{ padding: '3px 0'}}>
      <div >
        <label style={{ width: '100%' }}>{textKey}</label>
      </div>
      <input
        style={{ width: '100%' }}
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    </div>
  )
}
