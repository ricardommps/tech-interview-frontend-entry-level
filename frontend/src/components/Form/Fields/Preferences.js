import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  disabled = false,
  onPreferenceChange,
  preferences,
  selectedPreferences = [],
}) {
  const handlePreferenceChange = (preference) => {
    const updatedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter(
          (currentPreference) => currentPreference !== preference
        )
      : [...selectedPreferences, preference];

    onPreferenceChange(updatedPreferences);
  };

  return (
    <fieldset className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <legend className="text-lg font-bold text-slate-900">
            Preferencias do negocio
          </legend>
          <p className="text-sm text-slate-500">
            Escolha os objetivos e capacidades que fazem mais sentido para o
            momento da operacao.
          </p>
        </div>
        <span className="inline-flex min-w-fit items-center whitespace-nowrap rounded-full bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
          {selectedPreferences.length} selecionadas
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {preferences.map((preference, index) => (
          <div key={preference}>
            <Checkbox
              checked={selectedPreferences.includes(preference)}
              disabled={disabled}
              id={`preference-${index}`}
              value={preference}
              onChange={() => handlePreferenceChange(preference)}
            >
              {preference}
            </Checkbox>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

Preferences.propTypes = {
  disabled: PropTypes.bool,
  onPreferenceChange: PropTypes.func.isRequired,
  preferences: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPreferences: PropTypes.arrayOf(PropTypes.string),
};

export default Preferences;
