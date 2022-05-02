import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const DropDown = ({ label, name, defaultValue = '', required, options,disabled }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const optionsSelect = [['', 'Seleccione una opción', true], ...Object.entries(options)];
    useEffect(() => {
      setSelectedValue(defaultValue);
    }, [defaultValue]);
    return (
      <label htmlFor={name} className='flex flex-col my-3'>
        <span className='flex flex-col items-center justify-center'>{label}</span>
        <select
          required={required}
          name={name}
          className='input ml-2'
          value={selectedValue}
          disabled={disabled}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {optionsSelect.map((o) => {
            return (
              <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
                {o[1]}
              </option>
            );
          })}
        </select>
      </label>
    );
  };

export default DropDown