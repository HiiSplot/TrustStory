import { t } from "i18next"
import React from "react"
import { PageLoader } from "../components/page-loader"
import { Story } from "./Stories"
import { Grid } from "../components/grid"
import './style/favorite-stories.css'
import { MyModal } from "../components/modal"
import { StoryView } from "../components/story-view"
import { StoryForm } from "../components/story-form"

type FavoriteStory = {
  isLoading: boolean
  favoritesStories: Story[]
  setFavoritesStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export const FavoriteStories: React.FC<FavoriteStory> = ({ isLoading, favoritesStories, setFavoritesStories }) => {
  const [isFormEdit, setIsFormEdit] = React.useState(false)
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const [isStoryOpened, setIsStoryOpened] = React.useState(false)
  const [storyId, setStoryId] = React.useState<number>(0)
  
  return (
    <div>
      {/* <Title title={t("favorite.title")} /> */}
      <div className="favorite-stories-container">
        {isLoading ? (
          <PageLoader />
        ) : favoritesStories.length > 0 ? ( 
          <Grid
            items={favoritesStories}
            aria-label="Stories list"
            setStoryId={setStoryId}
            setIsStoryOpened={setIsStoryOpened}
            setIsFormOpened={setIsFormOpened}
            setIsFormEdit={setIsFormEdit}
            setStories={setFavoritesStories}
          />
        ) : (
          <div className="no-stories-container">
          <p>{t("profil.noStory")}</p>
          <a href="/stories" className="no-stories-container__link">{t("profil.button.favoriteStory")}</a>
          </div>
        )}
      </div>

      <MyModal isOpened={isStoryOpened} setIsOpened={setIsStoryOpened}>
        <StoryView
          storyId={storyId}
          stories={favoritesStories}
          setIsOpened={setIsStoryOpened}
        />
      </MyModal>

      <MyModal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <StoryForm
          setIsOpened={setIsFormOpened}
          setStories={setFavoritesStories}
          isFormEdit={isFormEdit}
          storyId={storyId}
        />
      </MyModal>

    </div>
  )
}