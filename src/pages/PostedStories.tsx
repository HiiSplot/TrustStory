import React from "react";
import { PageLoader } from "../components/page-loader";
import { MyModal } from "../components/modal";
import { StoryForm } from "../components/story-form";
import { Story } from "./Stories";
import { t } from "i18next";
import './style/posted-stories.css'
import { Grid } from "../components/grid";
import { StoryView } from "../components/story-view";

type PostedStory = {
  isLoading: boolean
  postedStories: Story[]
  setPostedStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export const PostedStories: React.FC<PostedStory> = ({ isLoading, postedStories, setPostedStories }) => {
  const [isFormEdit, setIsFormEdit] = React.useState(false)
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const [isStoryOpened, setIsStoryOpened] = React.useState(false)
  const [storyId, setStoryId] = React.useState<number>(0)
  
  return (
    <div>
      <div className="posted-stories-container">
        {isLoading ? (
          <PageLoader />
        ) : postedStories.length > 0 ? ( 
          <Grid
            items={postedStories}
            aria-label="Stories list"
            setStoryId={setStoryId}
            setIsStoryOpened={setIsStoryOpened}
            setIsFormOpened={setIsFormOpened}
            setIsFormEdit={setIsFormEdit}
            setStories={setPostedStories}
            />
        ) : (
          <div className="no-stories-container">
          <p>{t("profil.noStory")}</p>
          <a href="#" onClick={() => setIsFormOpened(true)} className="no-stories-container__link">{t("profil.button.postStory")}</a>
          </div>
        )}
      </div>

      <MyModal isOpened={isStoryOpened} setIsOpened={setIsStoryOpened}>
        <StoryView
          storyId={storyId}
          stories={postedStories}
          setIsOpened={setIsStoryOpened}
        />
      </MyModal>

      <MyModal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <StoryForm
          setIsOpened={setIsFormOpened}
          setStories={setPostedStories}
          isFormEdit={isFormEdit}
          storyId={storyId}
        />
      </MyModal>

    </div>
  )
}