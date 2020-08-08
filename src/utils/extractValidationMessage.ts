import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function extractValidationMessage(
  error: ValidationError,
): Errors {
  const errors: Errors = {};

  error.inner.forEach(validationError => {
    errors[validationError.path] = validationError.message;
  });

  return errors;
}
