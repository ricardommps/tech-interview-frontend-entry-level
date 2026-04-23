const DEFAULT_API_URL = 'http://localhost:3001';

const getApiBaseUrl = () => {
  return (process.env.REACT_APP_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
};

const getProducts = async (requestOptions = {}) => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/products`, requestOptions);

    if (!response.ok) {
      throw new Error(`Erro ao obter os produtos: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    throw error;
  }
};

export { DEFAULT_API_URL, getApiBaseUrl };

export default getProducts;
