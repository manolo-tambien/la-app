export const login = async ({ email, password }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    if (!email && !password) throw new Error('Datos incorrectos.');
    const response = await fetch(apiUrl + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    })
  
    if (!response.ok) {
      if (response.statusText === 'Unauthorized')
        throw new Error('Credenciales incorrectas.');
      else
        throw new Error('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  
    return await response.json();
  }