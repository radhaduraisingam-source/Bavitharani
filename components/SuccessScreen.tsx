import React from 'react';

const SuccessScreen: React.FC = () => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center p-4 animate-fade-in">
      <div className="bg-white/30 backdrop-blur-md border border-white/40 p-8 rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.5)] max-w-lg mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg leading-tight">
          YAYYY! <br/>
          😭❤️💍😂
        </h1>
        <p className="text-xl md:text-2xl text-white font-bold drop-shadow-md mb-8">
          You Just Made Me The Happiest Person Alive! 
        </p>
        <p className="text-white/90 italic text-lg">
            No takebacks now! The contract is sealed! 📜🖊️
        </p>
        <div className="mt-8 text-6xl animate-bounce-slight">
            💑
        </div>
      </div>
      
      {/* Footer message */}
      <div className="absolute bottom-10 text-white/80 font-medium">
        Screenshots allowed for proof 📸
      </div>
    </div>
  );
};

export default SuccessScreen;