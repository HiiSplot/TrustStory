import React from "react"

type TextArea = {
  textKey: string
}

export const TextArea: React.FC<TextArea> = ({ textKey }) => {

  return(
    <div>
      <div>
        <label htmlFor="">{textKey}</label>
      </div>
      <textarea rows={10}/>
    </div>
  )
}
