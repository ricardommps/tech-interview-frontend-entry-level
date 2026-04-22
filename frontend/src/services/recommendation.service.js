export const RECOMMENDATION_TYPES = {
  SINGLE_PRODUCT: 'SingleProduct',
  MULTIPLE_PRODUCTS: 'MultipleProducts',
};

const getSafeArray = (values) => (Array.isArray(values) ? values.filter(Boolean) : []);

const hasSelection = ({ preferences, features, recommendationType }) =>
  Boolean(recommendationType) && preferences.length + features.length > 0;

const getMatchedValues = (selectedValues, productValues = []) => {
  const selectedValuesSet = new Set(selectedValues);

  return productValues.filter((value) => selectedValuesSet.has(value));
};

const getRankedProducts = (products, { preferences, features }) => {
  return products
    .map((product, index) => {
      const matchedPreferences = getMatchedValues(
        preferences,
        product.preferences
      );
      const matchedFeatures = getMatchedValues(features, product.features);
      const score = matchedPreferences.length + matchedFeatures.length;

      return {
        ...product,
        matchedPreferences,
        matchedFeatures,
        score,
        originalIndex: index,
      };
    })
    .filter((product) => product.score > 0)
    .sort((currentProduct, nextProduct) => {
      if (nextProduct.score !== currentProduct.score) {
        return nextProduct.score - currentProduct.score;
      }

      return currentProduct.originalIndex - nextProduct.originalIndex;
    })
    .map(({ originalIndex, ...product }) => product);
};

const getSingleProductRecommendation = (rankedProducts) => {
  if (rankedProducts.length === 0) {
    return [];
  }

  const topScore = rankedProducts[0].score;
  const tiedProducts = rankedProducts.filter((product) => product.score === topScore);

  return [tiedProducts[tiedProducts.length - 1]];
};

const recommendationStrategies = {
  [RECOMMENDATION_TYPES.SINGLE_PRODUCT]: getSingleProductRecommendation,
  [RECOMMENDATION_TYPES.MULTIPLE_PRODUCTS]: (rankedProducts) => rankedProducts,
};

const getRecommendations = (formData = {}, products = []) => {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  const normalizedFormData = {
    preferences: getSafeArray(formData.selectedPreferences),
    features: getSafeArray(formData.selectedFeatures),
    recommendationType: formData.selectedRecommendationType ?? '',
  };

  if (!hasSelection(normalizedFormData)) {
    return [];
  }

  const rankedProducts = getRankedProducts(products, normalizedFormData);
  const selectRecommendations =
    recommendationStrategies[normalizedFormData.recommendationType];

  if (!selectRecommendations) {
    return [];
  }

  return selectRecommendations(rankedProducts);
};

const recommendationService = {
  getRecommendations,
};

export default recommendationService;
