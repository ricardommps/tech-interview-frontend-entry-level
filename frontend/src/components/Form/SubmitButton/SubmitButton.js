import PropTypes from 'prop-types';
import React from 'react';

function SubmitButton({ disabled = false, text }) {
  return (
    <button
      className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
