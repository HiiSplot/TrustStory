import React from "react"
import './text-area.css'

type TextArea = {
  textKey: string
  cols?: number
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextArea> = ({ textKey, cols, name, value, onChange }) => {

  return(
    <div className='text-area-container'>
      <label>{textKey}</label>
      <textarea
        className='text-area'
        rows={10}
        cols={cols}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
