import React from "react";
import { PageLoader } from "../components/page-loader";
import { MyTable } from "../components/table";
import { MyModal } from "../components/modal";
import { StoryForm } from "../components/story-form";
import { getStoriesByUser } from "../api/api";
import { t } from "i18next";
import './style/posted-stories.css'

type PostedStory = {
  id: number,
  title: string,
  date: string,
  author: string,
  description: string,
}

export const PostedStories: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [postedStories, setPostedStories] = React.useState<PostedStory[]>([]);
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const userId = Number(localStorage.getItem('userId'))

  const fetchStories = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getStoriesByUser(userId);
      setPostedStories(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  }, [userId]);

  React.useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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
        <a href="#" onClick={() => setIsFormOpened(true)} className="no-stories-container__link">{t("profil.postStoryButton")}</a>
        </div>
      )}
      </div>

      <MyModal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <StoryForm setIsOpened={setIsFormOpened} />
      </MyModal>

    </div>
  )
}