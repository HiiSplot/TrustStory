import React from "react"
import './icon-button.css'
import { useTranslation } from "react-i18next"

type IconButton = {
  iconName: string
  labelKey: string
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
}

export const IconButton: React.FC<IconButton> = ({ iconName, labelKey, onClick, type }) => {
  const { t } = useTranslation()

  return(
    <button onClick={onClick} className="icon-button" type={type}>
      <span className="material-symbols-outlined" >
        {iconName}
      </span>
      {t(labelKey)}
    </button>
  )
}
