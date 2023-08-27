import React from 'react';

const RadioButton = ({ title, value, status, setStatus, children }) => {
  const changeHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className='mb-3 flex flex-wrap items-center'>
      <label className='flex flex-wrap px-1'>
        {children} {title}{' '}
      </label>
      <input
        type='radio'
        value={value}
        onChange={changeHandler}
        checked={status == value}
      />
    </div>
  );
};

export default RadioButton;
