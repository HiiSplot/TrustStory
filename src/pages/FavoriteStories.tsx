import { t } from "i18next"
import React from "react"

export const FavoriteStories: React.FC = () => {
  return (
    <div>
      <h1>{t("favorite.title")}</h1>
    </div>
  )
}