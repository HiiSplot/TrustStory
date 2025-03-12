interface SignUpData {
  user: string;
  password: string;
  email: string;
  date: string;
}

interface LoginData {
  user: string;
  password: string;
}

interface StoryData {
  title: string
  date: string
  author: string
  description: string
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

export const onCreateStory = async (data: StoryData) => {
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

export const getInformations = async () => {
  const userId = localStorage.getItem('userId');
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
  const userId = localStorage.getItem('userId');
  try {
    const response = await fetch(`http://localhost:3000/stories/${storyId}/${userId}`, {
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

export const getFavorites = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await fetch(`http://localhost:3000/favorites/${userId}`, {
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
