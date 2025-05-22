import { useEffect, useState, useCallback } from "react"
import { getFavoriteByStory, postInFavorites, removeFavorite } from "../api/api"

export const useFavorite = (storyId: number) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const data = await getFavoriteByStory(storyId)
        setIsFavorite(data.length > 0)
        setFavoritesCount(data.length)
      } catch (error) {
        console.error("Erreur lors du chargement des favoris", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorite()
  }, [storyId])

  const toggleFavorite = useCallback(async () => {
    const newFavoriteState = !isFavorite
    setIsFavorite(newFavoriteState)
    setFavoritesCount((prev) => newFavoriteState ? prev + 1 : prev - 1)
    // updateStoryFavorite(storyId, newFavoriteState)

    try {
      if (newFavoriteState) {
        await postInFavorites(storyId)
      } else {
        await removeFavorite(storyId)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris", error)
      setIsFavorite(!newFavoriteState)
      setFavoritesCount((prev) => newFavoriteState ? prev - 1 : prev + 1)
    }
  }, [isFavorite, storyId])

  return {
    isFavorite,
    setIsFavorite,
    favoritesCount,
    setFavoritesCount,
    toggleFavorite,
    loading,
  }
}
