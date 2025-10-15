import React from 'react';
import { CheckCircleIcon } from './icons/FeedbackIcons';

interface SuccessDisplayProps {
  email: string;
  onProceed: () => void;
}

const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ email, onProceed }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <div className="flex justify-center mb-4">
             <CheckCircleIcon />
        </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600">
        A confirmation link has been sent to <span className="font-semibold text-indigo-600">{email}</span>.
      </p>
       <p className="text-gray-500 mt-2 text-sm">Please check your inbox to activate your account.</p>
      <button
        onClick={onProceed}
        className="mt-6 w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessDisplay;
