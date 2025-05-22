import { USER_ID } from "../context/AuthContext";
import { Story } from "../api/types";
import { InsertResult } from "./types";

const PORT = 3060

type Filters = {
  filters?: number[]; // ex: "category_id:2,author:Jean"
  value?: string;
}

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
    const response = await fetch(`http://localhost:${PORT}/categories`, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data
    } else {
      throw new Error("Erreur lors de la récupération des catégories");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getCategoryName = async (categoryId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/categories/${categoryId}`, {
      method: 'GET',
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data[0]
    } else {
      throw new Error("Erreur lors de la récupération des catégories");
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getStories = async ({ filters = [], value = '' }: Filters) => {
  const searchParams = new URLSearchParams();
  filters.forEach(filter => searchParams.append('filters', String(filter)));
  if (value) searchParams.append('value', value);
  
  const url = `http://localhost:${PORT}/stories?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    } else {
      throw new Error("Erreur lors de la récupération des histoires");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const onCreateStory = async (data: Omit<Story, 'id' | 'isFavorite'>): Promise<InsertResult> => {
  try {    
    const response = await fetch(`http://localhost:${PORT}/stories`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    });
    
    if (response.ok) {      
      const responseData = await response.json();
      return responseData.data
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
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}`, {
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
    const response = await fetch(`http://localhost:${PORT}/signup`, {
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
    const response = await fetch(`http://localhost:${PORT}/login`, {
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
    const response = await fetch(`http://localhost:${PORT}/profil/${userId}`, {
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

export const postInFavorites = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}/${USER_ID}`, {
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
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}/${USER_ID}`, {
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
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}/${USER_ID}`, {
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

export const getFavoritesByUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/profil/${userId}/favorite`, {
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

export const getStoriesByUser = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/profil/${userId}/stories`, {
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

export const getStoryById = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}`, {
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

export const deleteStoryById = async (storyId: number) => {
  try {
    const response = await fetch(`http://localhost:${PORT}/stories/${storyId}`, {
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
    const response = await fetch(`http://localhost:${PORT}/user/${userId}`, {
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
