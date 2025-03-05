import React from "react"

type TextArea = {
  textKey: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextArea> = ({ textKey, name, value, onChange }) => {

  return(
    <div style={{ padding: '5px 0'}}>
      <div>
        <label>{textKey}</label>
      </div>
      <textarea
        style={{ width: '100%', background: '#E8F0FE', border: 'none', padding: '5px' }}
        rows={10}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
