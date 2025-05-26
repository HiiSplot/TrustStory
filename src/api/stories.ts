import { InsertResult, Story } from "./types";

const PORT = 3060

type Filters = {
  filters?: number[]; // ex: "category_id:2,author:Jean"
  value?: string;
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