import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({
  disabled = false,
  features,
  selectedFeatures = [],
  onFeatureChange,
}) {
  const handleFeatureChange = (feature) => {
    const updatedFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((currentFeature) => currentFeature !== feature)
      : [...selectedFeatures, feature];

    onFeatureChange(updatedFeatures);
  };

  return (
    <fieldset className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <legend className="text-lg font-bold text-slate-900">
            Funcionalidades essenciais
          </legend>
          <p className="text-sm text-slate-500">
            Marque os recursos que devem ter peso direto na recomendacao final.
          </p>
        </div>
        <span className="inline-flex min-w-fit items-center whitespace-nowrap rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
          {selectedFeatures.length} selecionadas
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {features.map((feature, index) => (
          <div key={feature}>
            <Checkbox
              checked={selectedFeatures.includes(feature)}
              disabled={disabled}
              id={`feature-${index}`}
              value={feature}
              onChange={() => handleFeatureChange(feature)}
            >
              {feature}
            </Checkbox>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

Features.propTypes = {
  disabled: PropTypes.bool,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFeatureChange: PropTypes.func.isRequired,
  selectedFeatures: PropTypes.arrayOf(PropTypes.string),
};

export default Features;
