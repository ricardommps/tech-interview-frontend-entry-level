import PropTypes from 'prop-types';
import React from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

const INITIAL_FORM_STATE = {
  selectedPreferences: [],
  selectedFeatures: [],
  selectedRecommendationType: '',
};

const RECOMMENDATION_TYPE_LABELS = {
  SingleProduct: 'Produto unico',
  MultipleProducts: 'Lista priorizada',
};

function Form({ onRecommendationsChange }) {
  const { preferences, features, products, isLoading, error } = useProducts();
  const { formData, handleChange } = useForm({
    ...INITIAL_FORM_STATE,
  });
  const { getRecommendations } = useRecommendations(products);

  const handleFieldChange = (field, value) => {
    handleChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecommendationsChange(getRecommendations(formData));
  };

  const selectedItemsCount =
    formData.selectedPreferences.length + formData.selectedFeatures.length;
  const isSubmitDisabled =
    isLoading ||
    Boolean(error) ||
    !formData.selectedRecommendationType ||
    selectedItemsCount === 0;
  const summaryCards = [
    {
      label: 'Preferencias',
      labelClassName: 'text-[10px] sm:text-[11px]',
      value: formData.selectedPreferences.length,
    },
    {
      label: 'Funcionalidades',
      labelClassName: 'text-[9px] tracking-[0.12em] sm:text-[10px] sm:tracking-[0.14em]',
      value: formData.selectedFeatures.length,
    },
    {
      className: 'min-[480px]:col-span-2',
      label: 'Formato',
      labelClassName: 'text-[10px] sm:text-[11px]',
      value:
        RECOMMENDATION_TYPE_LABELS[formData.selectedRecommendationType] ||
        'Selecione um modo',
      valueClassName: 'max-w-full text-sm leading-6 sm:text-base',
    },
  ];

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Defina o perfil ideal
        </h2>
        <p className="text-sm leading-6 text-slate-600">
          Combine preferencias, funcionalidades e o formato da resposta para
          receber a recomendacao mais aderente ao seu contexto.
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      <form className="flex h-full flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Preferences
            disabled={isLoading}
            onPreferenceChange={(selected) =>
              handleFieldChange('selectedPreferences', selected)
            }
            preferences={preferences}
            selectedPreferences={formData.selectedPreferences}
          />

          <Features
            disabled={isLoading}
            features={features}
            onFeatureChange={(selected) =>
              handleFieldChange('selectedFeatures', selected)
            }
            selectedFeatures={formData.selectedFeatures}
          />

          <RecommendationType
            disabled={isLoading}
            onRecommendationTypeChange={(selected) =>
              handleFieldChange('selectedRecommendationType', selected)
            }
            selectedRecommendationType={formData.selectedRecommendationType}
          />
        </div>

        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 min-[480px]:grid-cols-2">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={[
                'min-w-0 rounded-2xl bg-white px-5 py-4 shadow-sm shadow-slate-200/70',
                card.className || '',
              ].join(' ')}
            >
              <p
                className={[
                  'pr-2 font-semibold uppercase tracking-[0.15em] text-slate-500',
                  card.labelClassName || 'text-[10px] sm:text-[11px]',
                ].join(' ')}
              >
                {card.label}
              </p>
              <p
                className={[
                  'mt-3 break-words pr-1 font-bold text-slate-900',
                  card.valueClassName || 'text-2xl',
                ].join(' ')}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Carregando catalogo de produtos...
          </div>
        ) : null}

        <SubmitButton disabled={isSubmitDisabled} text="Gerar recomendacao" />
      </form>
    </div>
  );
}

Form.propTypes = {
  onRecommendationsChange: PropTypes.func.isRequired,
};

export default Form;
