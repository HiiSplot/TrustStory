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
    });

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