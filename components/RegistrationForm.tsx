import React, { useState, useCallback, useMemo } from 'react';
import { FormData, FormErrors, PasswordStrength } from '../types';
import InputField from './InputField';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { EyeIcon, EyeSlashIcon } from './icons/PasswordIcons';

interface RegistrationFormProps {
  onRegistrationSuccess: (email: string, fullName: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: { value: '', isRevealed: false },
    confirmPassword: { value: '', isRevealed: false },
    agreesToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    
    if (!formData.password.value) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.value.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password.value)) {
       newErrors.password = 'Must contain uppercase, lowercase, number, and special character.';
    }

    if (formData.password.value !== formData.confirmPassword.value) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreesToTerms) {
        newErrors.agreesToTerms = 'You must agree to the terms and conditions.';
    }

    return newErrors;
  }, [formData]);

  const passwordStrength = useMemo((): PasswordStrength => {
      const password = formData.password.value;
      if (!password) return PasswordStrength.EMPTY;

      let score = 0;
      if (password.length >= 8) score++;
      if (password.length >= 12) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[@$!%*?&]/.test(password)) score++;
      
      if(score < 2) return PasswordStrength.VERY_WEAK;
      if(score < 3) return PasswordStrength.WEAK;
      if(score < 4) return PasswordStrength.MEDIUM;
      if(score < 5) return PasswordStrength.STRONG;
      return PasswordStrength.VERY_STRONG;
  }, [formData.password.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'password' || name === 'confirmPassword') {
        setFormData(prev => ({
            ...prev,
            [name]: { ...prev[name], value: value }
        }));
    } else {
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
    }
  };
  
  const handleBlur = () => {
    // Validate the form and update errors when a field loses focus
    const newErrors = validate();
    setErrors(newErrors);
  };
  
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], isRevealed: !prev[field].isRevealed }
      }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        onRegistrationSuccess(formData.email, formData.fullName);
      }, 1500);
    }
  };
  
  const isFormValid = useMemo(() => Object.keys(validate()).length === 0, [validate]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          id="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
          placeholder="John Doe"
        />
        <InputField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="you@example.com"
        />
        <InputField
          id="password"
          label="Password"
          type={formData.password.isRevealed ? 'text' : 'password'}
          value={formData.password.value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          placeholder="••••••••"
        >
            <button type="button" onClick={() => togglePasswordVisibility('password')} className="text-gray-500 hover:text-indigo-600 focus:outline-none" aria-label="Toggle password visibility">
                {formData.password.isRevealed ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
        </InputField>
        <PasswordStrengthIndicator strength={passwordStrength} />

         <div className="mt-4">
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={formData.confirmPassword.isRevealed ? 'text' : 'password'}
              value={formData.confirmPassword.value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              placeholder="••••••••"
            >
                <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')} className="text-gray-500 hover:text-indigo-600 focus:outline-none" aria-label="Toggle confirm password visibility">
                    {formData.confirmPassword.isRevealed ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
            </InputField>
         </div>
        
        <div className="mt-6">
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="agreesToTerms"
                        name="agreesToTerms"
                        type="checkbox"
                        checked={formData.agreesToTerms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="agreesToTerms" className="font-medium text-gray-700">
                        I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
                    </label>
                </div>
            </div>
             {errors.agreesToTerms && <p className="mt-1 text-xs text-red-600">{errors.agreesToTerms}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
              </>
            ) : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;