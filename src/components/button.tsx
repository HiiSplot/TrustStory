import React from "react"
import './button.css'
import { useTranslation } from "react-i18next"

type Button = {
  labelKey: string
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
}

export const Button: React.FC<Button> = ({ labelKey, onClick, type }) => {
  const { t } = useTranslation()

  return(
    <button onClick={onClick} className="button" type={type}>
      {t(labelKey)}
    </button>
  )
}
