import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';

const getUniqueValuesByField = (products, fieldName) => {
  return [...new Set(products.flatMap((product) => product[fieldName] || []))].sort(
    (currentValue, nextValue) => currentValue.localeCompare(nextValue, 'pt-BR')
  );
};

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const nextProducts = await getProducts();

        if (!isMounted) {
          return;
        }

        setProducts(nextProducts);
        setPreferences(getUniqueValuesByField(nextProducts, 'preferences'));
        setFeatures(getUniqueValuesByField(nextProducts, 'features'));
        setError('');
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
        if (isMounted) {
          setError(
            'Nao foi possivel carregar os produtos agora. Tente novamente em instantes.'
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { preferences, features, products, isLoading, error };
};

export default useProducts;
