import React from "react";
import { PageLoader } from "../components/page-loader";
import { MyTable } from "../components/table";
import { MyModal } from "../components/modal";
import { StoryForm } from "../components/story-form";
import { Story } from "./Stories";
import { t } from "i18next";
import './style/posted-stories.css'

type PostedStory = {
  isLoading: boolean
  postedStories: Story[]
}

export const PostedStories: React.FC<PostedStory> = ({ isLoading, postedStories}) => {
  const [isFormOpened, setIsFormOpened] = React.useState(false)

  return (
    <div>
      <div className="grid-container">
      {isLoading ? (
        <PageLoader />
      ) : postedStories.length > 0 ? ( 
        <MyTable items={postedStories} aria-label="Stories list" className="grid-container__grid-list" />
      ) : (
        <div className="no-stories-container">
        <p>{t("profil.noStory")}</p>
        <a href="#" onClick={() => setIsFormOpened(true)} className="no-stories-container__link">{t("profil.button.postStory")}</a>
        </div>
      )}
      </div>

      <MyModal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <StoryForm setIsOpened={setIsFormOpened} />
      </MyModal>

    </div>
  )
}