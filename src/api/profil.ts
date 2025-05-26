const PORT = 3060

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