import { useCallback } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const getRecommendations = useCallback(
    (formData) => {
      return recommendationService.getRecommendations(formData, products);
    },
    [products]
  );

  return { getRecommendations };
}

export default useRecommendations;
