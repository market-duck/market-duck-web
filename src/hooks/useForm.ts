import { useState } from 'react';

interface FormErrors<T> {
  [key: string]: string | undefined;
}

export const useForm = <T>({
  initialValues,
  onSubmit,
  validate,
}: {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => FormErrors<T>;
}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (name: string, value: ValueOfType<T>) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      const hasErrors = Object.keys(validationErrors).length > 0;
      if (hasErrors) return;
    }

    onSubmit(values);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
