import React from "react"
import './input.css'

type Input = {
  textKey: string
  name: string
  type: string
  value: string
  min?: string
  max?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isDisabled?: boolean
}

export const Input: React.FC<Input> = ({ textKey, type, name, value, min, max, onChange, isDisabled }) => {

  return(
    <div style={{ padding: '3px 0', marginBottom: '7px' }}>
      <div >
        <label style={{ width: '100%' }}>{textKey}</label>
      </div>
      <input
        className="input"
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  )
}
