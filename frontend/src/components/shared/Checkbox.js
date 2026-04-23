import PropTypes from 'prop-types';
import React from 'react';

function Checkbox({
  align = 'center',
  checked = false,
  children,
  className = '',
  description = '',
  disabled = false,
  id,
  name,
  onChange,
  type = 'checkbox',
  value,
}) {
  const isRadio = type === 'radio';
  const isStartAligned = align === 'start';

  return (
    <label
      className={[
        'group flex min-h-[84px] w-full gap-3 rounded-2xl border px-4 py-4 text-left transition focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-white',
        isStartAligned ? 'items-start' : 'items-center',
        checked
          ? 'border-cyan-500 bg-cyan-50 shadow-sm shadow-cyan-100'
          : 'border-slate-200 bg-white hover:border-cyan-200 hover:bg-slate-50',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      ].join(' ')}
      htmlFor={id}
    >
      <input
        checked={checked}
        className="sr-only"
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center border transition',
          isStartAligned ? 'mt-0.5' : 'mt-0',
          isRadio ? 'rounded-full' : 'rounded-md',
          checked
            ? 'border-cyan-600 bg-cyan-600'
            : 'border-slate-300 bg-white group-hover:border-cyan-300',
        ].join(' ')}
      >
        <span
          className={[
            'block transition',
            isRadio ? 'h-2 w-2 rounded-full' : 'h-2.5 w-2.5 rounded-[2px]',
            checked ? 'scale-100 bg-white' : 'scale-0 bg-transparent',
          ].join(' ')}
        />
      </span>
      <span className="min-w-0 flex-1 space-y-1">
        <span className="block text-sm font-semibold leading-6 text-slate-900">
          {children}
        </span>
        {description ? (
          <span className="block text-sm leading-5 text-slate-500">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  align: PropTypes.oneOf(['center', 'start']),
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  value: PropTypes.string.isRequired,
};

export default Checkbox;
