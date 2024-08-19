import PersistenceManager from "../../persistence/persistence";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const inverters = async () => { 
  try {
    const response = await fetch(apiUrl + 'products', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${PersistenceManager.getItem('userToken')}`
      }
    });

    if (response.ok) {
      return await response.json();       
    } else {
      throw new Error('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  } catch (e) {
    throw new Error(e)
  }
}