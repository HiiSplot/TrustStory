import { USER_ID } from "../context/AuthContext";
import { Story } from "../pages/Stories";

interface SignUpData {
  firstName: string;
  lastName: string;
  pseudo: string;
  password: string;
  email: string;
  date: string;
}

interface LoginData {
  user: string;
  password: string;
}

export const getCategories = async () => {
  try {
    const response = await fetch('http://localhost:3000/categories', {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData
    } else {
      throw new Error("Erreur lors de la récupération des catégories");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getStories = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const url = `http://localhost:3000/stories?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData
    } else {
      throw new Error("Erreur lors de la récupération des histoires");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const onCreateStory = async (data: Omit<Story, 'id' | 'isFavorite'>): Promise<Story> => {
  try {    
    const response = await fetch('http://localhost:3000/stories', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    });

    if (response.ok) {      
      const responseData = await response.json();
      return responseData
    } else {
      throw new Error("Erreur lors de la création de l'histoire");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const onDeleteStory = async (storyId: number) => {
  try {    
    const response = await fetch(`http://localhost:3000/stories/${storyId}`, {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {      
      const responseData = await response.json();
      return responseData
    } else {
      throw new Error("Erreur lors de la suppression de l'histoire");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const onSignUpValidate = async (data: SignUpData) => {

  try {    
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    });

    if (response.ok) {      
      const responseData = await response.json();
      return responseData
    } else {
      throw new Error("Erreur lors de l'envoi des données");
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const onSignInValidate = async (data: LoginData) => {
  try {    
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    })

    if (response.ok) {      
      const responseData = await response.json()
      return responseData
    } else {
      throw new Error('Erreur lors de la connexion')
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getInformations = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/profil/${userId}`, {
      method: 'GET',
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

export const postInFavorites = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/stories/${storyId}/${USER_ID}`, {
      method: 'POST',
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

export const removeFavorite = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/stories/${storyId}/${USER_ID}`, {
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

export const getFavoriteByStory = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/stories/${storyId}/${USER_ID}`, {
      method: 'GET',
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

export const getFavoritesByUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/profil/${userId}/favorite`, {
      method: 'GET',
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

export const getStoriesByUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/profil/${userId}/stories`, {
      method: 'GET',
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

export const getStoryById = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/story/${storyId}`, {
      method: 'GET',
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

export const deleteStoryById = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/story/${storyId}`, {
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

export const getUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      method: 'GET',
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
