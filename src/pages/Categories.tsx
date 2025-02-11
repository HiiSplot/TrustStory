import { t } from "i18next"
import React from "react"

export const Categories: React.FC = () => {
  return (
    <div>
      <h1>{t("categories.title")}</h1>
    </div>
  )
}