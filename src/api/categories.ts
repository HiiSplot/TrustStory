const PORT = 3060

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