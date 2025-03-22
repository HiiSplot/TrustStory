import { t } from "i18next"
import React from "react"
import { PageLoader } from "../components/page-loader"
import { Story } from "./Stories"
import { Grid } from "../components/grid"
import './style/favorite-stories.css'

type FavoriteStory = {
  isLoading: boolean
  favoritesStories: Story[]
}

export const FavoriteStories: React.FC<FavoriteStory> = ({ isLoading, favoritesStories }) => {
  
  return (
    <div>
      {/* <Title title={t("favorite.title")} /> */}
      <div className="favorite-stories-container">
        {isLoading ? (
          <PageLoader />
        ) : favoritesStories.length > 0 ? ( 
          <Grid items={favoritesStories} aria-label="Stories list" className="grid-container__grid-list" />
        ) : (
          <div className="no-stories-container">
          <p>{t("profil.noStory")}</p>
          <a href="/stories" className="no-stories-container__link">{t("profil.button.favoriteStory")}</a>
          </div>
        )}
      </div>

    </div>
  )
}