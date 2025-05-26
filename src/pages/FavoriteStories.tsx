import { t } from "i18next"
import React from "react"
import { PageLoader } from "../components/page-loader"
import { MyModal } from "../components/modal"
import { StoryView } from "../components/story-view"
import { StoryForm } from "../components/story-form"
import { Story } from "../api/types"
import { Grid } from "../components/grid"
import './style/favorite-stories.css'
import { useFavoriteStories } from "../hooks/useFavorite"

type FavoriteStory = {
  isLoading: boolean
  favoritesStories: Story[]
  setFavoritesStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export const FavoriteStories: React.FC<FavoriteStory> = ({ isLoading, favoritesStories, setFavoritesStories }) => {
  const { stories, setStories, updateStoryFavorite, toggleFavorite } = useFavoriteStories(favoritesStories)
  const [isFormEdit, setIsFormEdit] = React.useState(false)
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const [isStoryOpened, setIsStoryOpened] = React.useState(false)
  const [storyId, setStoryId] = React.useState<number>(0)
  
  return (
    <div>
      <div className="favorite-stories-container">
        {isLoading ? (
          <PageLoader />
        ) : stories.length > 0 ? ( 
          <Grid
            items={stories}
            aria-label="Stories list"
            setStoryId={setStoryId}
            setIsStoryOpened={setIsStoryOpened}
            setIsFormOpened={setIsFormOpened}
            setIsFormEdit={setIsFormEdit}
            setStories={setStories}
            updateStoryFavorite={updateStoryFavorite}
            toggleFavorite={toggleFavorite}
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
          stories={stories}
          setIsOpened={setIsStoryOpened}
          toggleFavorite={toggleFavorite}
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