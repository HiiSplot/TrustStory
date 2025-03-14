import React from "react"
import './icon-button.css'
import { useTranslation } from "react-i18next"

type IconButton = {
  iconName: string
  labelKey: string
  classNameText?: string
  classNameButton?: string
  onClick?: () => void
  type?: "submit" | "reset" | "button" | undefined
}

export const IconButton: React.FC<IconButton> = ({ iconName, labelKey, classNameButton, classNameText, onClick, type }) => {
  const { t } = useTranslation()

  const concatClassNameButton = `${classNameButton} icon-button`

  return(
    <button onClick={onClick} className={concatClassNameButton ??"icon-button"} type={type}>
      <span className="material-symbols-outlined icon-size">
        {iconName}
      </span>
      <p className={classNameText ?? ''}>{t(labelKey)}</p>
    </button>
  )
}
