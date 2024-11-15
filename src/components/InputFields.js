import React from 'react';

const FormInput = ({ 
  type, 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  rows, 
  required = false 
}) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        {label}
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            rows={rows || 4}
            required={required}
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required={required}
          />
        )}
      </label>
    </div>
  );
};

export default FormInput;
