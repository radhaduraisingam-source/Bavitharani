import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import CursorTrail from './components/CursorTrail';
import ProposalCard from './components/ProposalCard';
import Confetti from './components/Confetti';
import SuccessScreen from './components/SuccessScreen';

const App: React.FC = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out ${success ? 'bg-gradient-to-br from-pink-400 via-purple-400 to-yellow-200' : 'bg-gradient-to-br from-red-500 via-pink-500 to-purple-600'}`}>
      
      {/* Background Elements */}
      <FloatingHearts />
      <CursorTrail />
      
      {/* Show Confetti on Success */}
      {success && <Confetti />}

      {/* Main Content Area */}
      <main className="relative z-10 flex items-center justify-center min-h-screen w-full">
        {!success ? (
          <ProposalCard onSuccess={() => setSuccess(true)} />
        ) : (
          <SuccessScreen />
        )}
      </main>

    </div>
  );
};

export default App;