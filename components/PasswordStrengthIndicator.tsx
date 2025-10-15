
import React from 'react';
import { PasswordStrength } from '../types';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const strengthLevels = [
  { level: PasswordStrength.VERY_WEAK, color: 'bg-red-500', text: 'Very Weak' },
  { level: PasswordStrength.WEAK, color: 'bg-orange-500', text: 'Weak' },
  { level: PasswordStrength.MEDIUM, color: 'bg-yellow-500', text: 'Medium' },
  { level: PasswordStrength.STRONG, color: 'bg-lime-500', text: 'Strong' },
  { level: PasswordStrength.VERY_STRONG, color: 'bg-green-500', text: 'Very Strong' },
];

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  if (strength === PasswordStrength.EMPTY) {
    return null;
  }
  
  const currentLevel = strengthLevels[strength - 1];

  return (
    <div className="flex items-center mt-2 space-x-2">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${currentLevel.color}`}
          style={{ width: `${(strength / strengthLevels.length) * 100}%` }}
        ></div>
      </div>
      <span className={`text-xs font-semibold w-24 text-right ${currentLevel.color.replace('bg-', 'text-')}`}>
        {currentLevel.text}
      </span>
    </div>
  );
};

export default PasswordStrengthIndicator;
