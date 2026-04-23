import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

const getUniqueValuesByField = (products, fieldName) => {
  return [...new Set(products.flatMap((product) => product[fieldName] || []))].sort(
    (currentValue, nextValue) => currentValue.localeCompare(nextValue, 'pt-BR')
  );
};

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const nextProducts = await getProducts({ signal: controller.signal });
        const normalizedProducts = Array.isArray(nextProducts) ? nextProducts : [];

        setProducts(normalizedProducts);
        setError('');
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        console.error('Erro ao obter os produtos:', error);
        setProducts([]);
        setError(
          'Nao foi possivel carregar os produtos agora. Tente novamente em instantes.'
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  const preferences = getUniqueValuesByField(products, 'preferences');
  const features = getUniqueValuesByField(products, 'features');

  return { preferences, features, products, isLoading, error };
};

export default useProducts;
