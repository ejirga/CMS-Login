import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<{ email: string; name: string } | null>(null);

  const handleRegistrationSuccess = (email: string, fullName: string) => {
    setRegisteredUser({ email, name: fullName });
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setShowDashboard(false);
    setRegisteredUser(null);
  };
  
  const renderContent = () => {
    if (showDashboard && registeredUser) {
      return <Dashboard userName={registeredUser.name} onLogout={handleLogout} />;
    }
    return <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className={`w-full transition-all duration-300 mx-auto ${showDashboard ? 'max-w-3xl' : 'max-w-md'}`}>
        {!showDashboard && (
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Create Your Account
                </h1>
                <p className="text-gray-500 mt-2">
                  Join our community and start your journey.
                </p>
            </header>
        )}
        <main>
          {renderContent()}
        </main>
         {!showDashboard && (
             <footer className="text-center mt-8">
                <p className="text-sm text-gray-400">&copy; 2024 Your Company. All rights reserved.</p>
            </footer>
         )}
      </div>
    </div>
  );
};

export default App;
