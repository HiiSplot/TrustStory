import { t } from "i18next"
import React from "react"
import { getFavorites } from "../api/api";
import { GridList, GridListItem } from "react-aria-components";
import { Card } from "../components/card";
import { Title } from "../components/title";
import { PageLoader } from "../components/page-loader";
import './style/favorite-stories.css'
import { Button } from "../components/button";

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

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const data = await getFavorites();
      setFavoritesStories(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  }

  console.log(favoritesStories.length);
  

  React.useEffect(() => {
    fetchFavorites();
  }, []);
  
  return (
    <div>
      <Title title={t("favorite.title")} />
      <div className="grid-container">

      {isLoading ? (
        <PageLoader />
      ) : favoritesStories.length > 0 ? ( 
        <GridList items={favoritesStories} aria-label="Stories list" className="grid-container__grid-list">
          {(story) => (
            <GridListItem key={story.id}>
              <Card 
                id={story.id}
                title={story.title} 
                date={story.date} 
                author={story.author} 
                description={story.description} 
              />
            </GridListItem>
          )}
        </GridList>
      ) : (
        <div className="no-stories-container">
        <p>No stories available</p>
        <a href="/stories" className="no-stories-container__link">Ajoute ta première histoire</a>
        </div>
      )}
      </div>

    </div>
  )
}