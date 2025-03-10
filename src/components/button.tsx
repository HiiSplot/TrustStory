import React from "react"
import './button.css'
import { useTranslation } from "react-i18next"

type Button = {
  labelKey: string
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
  className?: string
}

export const Button: React.FC<Button> = ({ labelKey, onClick, type, className }) => {
  const { t } = useTranslation()

  return(
    <button onClick={onClick} className={className ?? 'button'} type={type}>
      {t(labelKey)}
    </button>
  )
}
