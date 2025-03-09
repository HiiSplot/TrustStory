import { t } from "i18next"
import React from "react"
import { getFavorites } from "../api/api";
import { GridList, GridListItem } from "react-aria-components";
import { Card } from "../components/card";
import { Title } from "../components/title";

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
      console.error('Erreur lors de la récupération des favoris :', error);
    }
  }

  React.useEffect(() => {
    fetchFavorites();
  }, []);
  
  return (
    <div>
      <Title title={t("favorite.title")} />
      {isLoading 
      ? <p>Loading...</p> 
      :
      <GridList items={favoritesStories} aria-label="Stories list" style={{ maxWidth: '100vh', display: 'grid', gap: '20px' }}>
      {favoritesStories.length > 0 ? (
        favoritesStories.map((story, index) => (
          <GridListItem key={index}>
            <Card 
              id={story.id}
              title={story.title} 
              date={story.date} 
              author={story.author} 
              description={story.description} 
            />
          </GridListItem>
        ))
      ) : (
        <p>No stories available</p>
      )}
      </GridList>
      }
      </div>
  )
}