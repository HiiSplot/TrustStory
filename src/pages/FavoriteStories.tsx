import { t } from "i18next"
import React from "react"

export const FavoriteStories: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  console.log(setIsLoading);
  
  return (
    <div>
      <h1>{t("favorite.title")}</h1>
      {isLoading ? <p>Loading...</p> : <p>Favorite stories</p>}
    </div>
  )
}