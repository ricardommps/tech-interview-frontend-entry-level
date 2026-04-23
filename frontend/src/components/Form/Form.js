import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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

function Form({ onRecommendationsChange }) {
  const { preferences, features, products, isLoading, error } = useProducts();
  const { formData, handleChange } = useForm({
    ...INITIAL_FORM_STATE,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { getRecommendations } = useRecommendations(products);

  useEffect(() => {
    if (!hasSubmitted) {
      return;
    }

    onRecommendationsChange(getRecommendations(formData));
  }, [formData, getRecommendations, hasSubmitted, onRecommendationsChange]);

  const handleFieldChange = (field, value) => {
    handleChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
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
      value: formData.selectedPreferences.length,
    },
    {
      label: 'Funcionalidades',
      value: formData.selectedFeatures.length,
    },
    {
      className: 'sm:col-span-2 xl:col-span-1',
      label: 'Formato',
      value: formData.selectedRecommendationType || 'Selecione um modo',
      valueClassName: 'text-sm leading-6',
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

        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={[
                'min-w-0 rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200/70',
                card.className || '',
              ].join(' ')}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>
              <p
                className={[
                  'mt-2 font-bold text-slate-900',
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
