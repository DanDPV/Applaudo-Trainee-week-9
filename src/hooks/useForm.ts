/* eslint no-unused-vars:0 */
import React, { useState } from 'react';

const useForm = <T>(
  initialState: T,
): [T, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [values, setValues] = useState<T>(initialState);

  const reset = () => setValues(initialState);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

export default useForm;
