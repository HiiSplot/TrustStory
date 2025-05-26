import React from "react"
import { Story } from "../api/types"
import { postInFavorites, removeFavorite } from "../api/favorites"

export const useFavoriteStories = (initialStories: Story[]) => {
  const [stories, setStories] = React.useState<Story[]>(initialStories)

  React.useEffect(() => {
    setStories(initialStories)
  }, [initialStories])

  const updateStoryFavorite = (storyId: number, isFav: boolean) => {
    setStories(prev =>
      prev.map(story =>
        story.id === storyId ? { ...story, isFavorite: isFav } : story
      )
    )
  }

  const toggleFavorite = async (storyId: number, currentFav: boolean) => {
    const newFav = !currentFav
    updateStoryFavorite(storyId, newFav)

    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId
          ? {
              ...story,
              favoritesCount: newFav
                ? (story.favoritesCount || 0) + 1
                : Math.max((story.favoritesCount || 1) - 1, 0),
            }
          : story
      )
    )

    try {
      if (newFav) {
        await postInFavorites(storyId)
      } else {
        await removeFavorite(storyId)
      }
    } catch (err) {
      console.error("Erreur favori", err)
      updateStoryFavorite(storyId, !newFav)
    }
  }

  return {
    stories,
    setStories,
    updateStoryFavorite,
    toggleFavorite,
  }
}
