import { USER_ID } from "../context/AuthContext"

const PORT = 3060

export const postInFavorites = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/favorites/${storyId}/${USER_ID}`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'}
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const removeFavorite = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/favorites/${storyId}/${USER_ID}`, {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'}
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllFavoritesByStoryId = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/favorites/${storyId}`, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getFavoriteByStory = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/favorites/${storyId}/${USER_ID}`, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    })

    if (response.ok) {
      const responseData = await response.json() 
      return responseData.data
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}