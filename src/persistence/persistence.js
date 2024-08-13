const PersistenceManager = {
  getItem: (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error al obtener el item del almacenamiento persistente:', error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error al guardar el item en el almacenamiento persistente:', error);
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar el item del almacenamiento persistente:', error);
    }
  }
};

export default PersistenceManager;