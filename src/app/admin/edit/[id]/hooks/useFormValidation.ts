"use client";

import { useState } from "react";

export function useFormValidation() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'title':
        return value.trim() ? '' : 'Il titolo è obbligatorio';
      case 'category':
        return value.trim() ? '' : 'La categoria è obbligatoria';
      case 'subcategory':
        return value.trim() ? '' : 'La sottocategoria è obbligatoria';
      case 'email':
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email non valida' : '';
      case 'website':
        return value && !/^https?:\/\/.+/.test(value) ? 'URL non valido (deve iniziare con http:// o https://)' : '';
      default:
        return '';
    }
  };

  const validateNestedField = (field: string, value: string): string => {
    switch (field) {
      case 'contactInfo.email':
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email non valida' : '';
      case 'contactInfo.website':
        return value && !/^https?:\/\/.+/.test(value) ? 'URL non valido (deve iniziare con http:// o https://)' : '';
      default:
        return '';
    }
  };

  const updateFieldError = (field: string, value: string) => {
    const error = validateField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return error;
  };

  const updateNestedFieldError = (field: string, value: string) => {
    const error = validateNestedField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
    return error;
  };

  const validateAllFields = (formData: any): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) errors.title = 'Il titolo è obbligatorio';
    if (!formData.category.trim()) errors.category = 'La categoria è obbligatoria';
    if (!formData.subcategory.trim()) errors.subcategory = 'La sottocategoria è obbligatoria';
    
    if (formData.contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
      errors['contactInfo.email'] = 'Email non valida';
    }
    if (formData.contactInfo.website && !/^https?:\/\/.+/.test(formData.contactInfo.website)) {
      errors['contactInfo.website'] = 'URL non valido';
    }

    setValidationErrors(errors);
    return errors;
  };

  const clearErrors = () => {
    setValidationErrors({});
  };

  return {
    validationErrors,
    updateFieldError,
    updateNestedFieldError,
    validateAllFields,
    clearErrors,
  };
}