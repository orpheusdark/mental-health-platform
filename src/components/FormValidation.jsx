import React, { useState } from 'react';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';

export default function FormValidation({ 
  children, 
  onSubmit, 
  validationRules = {},
  className = "" 
}) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.required;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.patternMessage || 'Invalid format';
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address';
    }

    if (rules.custom && typeof rules.custom === 'function') {
      return rules.custom(value);
    }

    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate all fields
    const newErrors = {};
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) newErrors[fieldName] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(data);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }

    setIsSubmitting(false);
  };

  const enhanceChildren = (children) => {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        if (child.type === 'input' || child.type === 'textarea' || child.type === 'select') {
          const fieldName = child.props.name;
          const hasError = errors[fieldName] && touched[fieldName];
          const isValid = touched[fieldName] && !errors[fieldName] && validationRules[fieldName];

          return (
            <div className="form-field">
              {React.cloneElement(child, {
                onChange: handleInputChange,
                onBlur: handleInputBlur,
                className: `${child.props.className || ''} ${hasError ? 'error' : ''} ${isValid ? 'valid' : ''}`,
                'aria-invalid': hasError,
                'aria-describedby': hasError ? `${fieldName}-error` : undefined
              })}
              {hasError && (
                <div className="field-error" id={`${fieldName}-error`}>
                  <FiAlertCircle className="error-icon" />
                  <span>{errors[fieldName]}</span>
                </div>
              )}
              {isValid && (
                <div className="field-success">
                  <FiCheck className="success-icon" />
                </div>
              )}
            </div>
          );
        }

        if (child.props.children) {
          return React.cloneElement(child, {
            children: enhanceChildren(child.props.children)
          });
        }
      }
      return child;
    });
  };

  return (
    <form onSubmit={handleSubmit} className={`validated-form ${className}`} noValidate>
      {enhanceChildren(children)}
      
      <style jsx>{`
        .validated-form {
          position: relative;
        }

        .form-field {
          position: relative;
          margin-bottom: var(--space-4);
        }

        .form-field input,
        .form-field textarea,
        .form-field select {
          width: 100%;
          transition: all var(--transition-fast);
          padding-right: var(--space-10);
        }

        .form-field input.error,
        .form-field textarea.error,
        .form-field select.error {
          border-color: var(--error-500);
          background-color: var(--error-50);
        }

        .form-field input.error:focus,
        .form-field textarea.error:focus,
        .form-field select.error:focus {
          box-shadow: 0 0 0 3px var(--error-100);
        }

        .form-field input.valid,
        .form-field textarea.valid,
        .form-field select.valid {
          border-color: var(--success-500);
          background-color: var(--success-50);
        }

        .form-field input.valid:focus,
        .form-field textarea.valid:focus,
        .form-field select.valid:focus {
          box-shadow: 0 0 0 3px var(--success-100);
        }

        .field-error {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          color: var(--error-500);
          font-size: var(--font-size-sm);
          margin-top: var(--space-1);
          animation: slideDown 0.2s ease-out;
        }

        .error-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .field-success {
          position: absolute;
          right: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--success-500);
        }

        .success-icon {
          width: 18px;
          height: 18px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .validated-form button[type="submit"] {
          position: relative;
          min-width: 120px;
        }

        .validated-form button[type="submit"]:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
}