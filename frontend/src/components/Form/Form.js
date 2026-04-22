import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

  const syncRecommendations = (nextFormData) => {
    onRecommendationsChange(getRecommendations(nextFormData));
  };

  const handleFieldChange = (field, value) => {
    const nextFormData = {
      ...formData,
      [field]: value,
    };

    handleChange(field, value);

    if (hasSubmitted) {
      syncRecommendations(nextFormData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    syncRecommendations(formData);
  };

  const selectedItemsCount =
    formData.selectedPreferences.length + formData.selectedFeatures.length;
  const isSubmitDisabled =
    isLoading ||
    Boolean(error) ||
    !formData.selectedRecommendationType ||
    selectedItemsCount === 0;

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-2">
        <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
          Etapa 1
        </span>
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

        <div className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Preferencias
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {formData.selectedPreferences.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Funcionalidades
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {formData.selectedFeatures.length}
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm shadow-slate-200/70">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Formato
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {formData.selectedRecommendationType || 'Selecione um modo'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Carregando catalogo de produtos...
          </div>
        ) : null}

        <SubmitButton
          disabled={isSubmitDisabled}
          text="Gerar recomendacao"
        />
      </form>
    </div>
  );
}

Form.propTypes = {
  onRecommendationsChange: PropTypes.func.isRequired,
};

export default Form;
