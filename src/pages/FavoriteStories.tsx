import { t } from "i18next"
import React from "react"
import { getFavorites } from "../api/api";
import { PageLoader } from "../components/page-loader";
import './style/favorite-stories.css'
import { MyTable } from "../components/table";

type FavoriteStory = {
  id: number,
  title: string,
  date: string,
  author: string,
  description: string,
}

export const FavoriteStories: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [favoritesStories, setFavoritesStories] = React.useState<FavoriteStory[]>([]);

  const fetchFavorites = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getFavorites();
      setFavoritesStories(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  }, []);

  React.useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);
  
  return (
    <div>
      {/* <Title title={t("favorite.title")} /> */}
      <div className="grid-container">
      {isLoading ? (
        <PageLoader />
      ) : favoritesStories.length > 0 ? ( 
        <MyTable items={favoritesStories} aria-label="Stories list" className="grid-container__grid-list" />
      ) : (
        <div className="no-stories-container">
        <p>{t("profil.noStory")}</p>
        <a href="/stories" className="no-stories-container__link">{t("profil.favoriteStoryButton")}</a>
        </div>
      )}
      </div>

    </div>
  )
}