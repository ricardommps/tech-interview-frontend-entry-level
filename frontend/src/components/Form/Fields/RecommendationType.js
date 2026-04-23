import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../../shared/Checkbox';

const recommendationTypeOptions = [
  {
    value: 'SingleProduct',
    label: 'Produto unico',
    description: 'Retorna apenas o produto com maior aderencia.',
  },
  {
    value: 'MultipleProducts',
    label: 'Lista priorizada',
    description: 'Mostra todos os produtos validos ordenados por aderencia.',
  },
];

function RecommendationType({
  disabled = false,
  onRecommendationTypeChange,
  selectedRecommendationType = '',
}) {
  return (
    <fieldset className="space-y-4">
      <div>
        <legend className="text-lg font-bold text-slate-900">
          Formato da recomendacao
        </legend>
        <p className="text-sm text-slate-500">
          Escolha entre uma resposta mais objetiva ou uma lista completa e
          priorizada.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {recommendationTypeOptions.map((option, index) => (
          <div key={option.value}>
            <Checkbox
              align="start"
              checked={selectedRecommendationType === option.value}
              description={option.description}
              disabled={disabled}
              id={`recommendation-type-${index}`}
              name="recommendationType"
              onChange={() => onRecommendationTypeChange(option.value)}
              type="radio"
              value={option.value}
            >
              {option.label}
            </Checkbox>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

RecommendationType.propTypes = {
  disabled: PropTypes.bool,
  onRecommendationTypeChange: PropTypes.func.isRequired,
  selectedRecommendationType: PropTypes.string,
};

export default RecommendationType;
