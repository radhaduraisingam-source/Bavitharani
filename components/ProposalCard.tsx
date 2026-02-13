import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FloatingMessage, Position } from '../types';

interface ProposalCardProps {
  onSuccess: () => void;
}

const FUNNY_MESSAGES = [
  "Are you sure? 🤨",
  "Think again 😂",
  "Don’t break my heart bro 😭💔",
  "System error… NO not allowed 🤖🚫",
  "Nice try! 😏",
  "Missed me! 💨",
  "Too slow! 🐢",
  "404: NO Not Found 🚫",
  "My mom is watching... 👀",
  "But I bought chocolates! 🍫",
  "Are you allergic to love? 🤧",
  "Click YES for free hugs! 🤗",
  "Playing hard to get? 😏"
];

const ProposalCard: React.FC<ProposalCardProps> = ({ onSuccess }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Position>({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [floatingMessages, setFloatingMessages] = useState<FloatingMessage[]>([]);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Sound toggle (visual only for this implementation as per prompt request for "Optional sound toggle")
  const [soundEnabled, setSoundEnabled] = useState(true);

  const moveNoButton = useCallback(() => {
    if (attempts >= 7) return; // Stop moving if faded out

    const container = containerRef.current;
    const btn = noBtnRef.current;
    
    if (!container || !btn) return;

    // Calculate available space
    // We use a bit of padding to ensure it doesn't hit the very edge
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Ensure we keep it somewhat visible and not under the main card if possible, 
    // but random is usually funny enough.
    
    setNoBtnPosition({ x: Math.max(10, newX), y: Math.max(10, newY) });
    setIsMoved(true);
    setAttempts((prev) => prev + 1);

    // Add funny floating message
    const msgText = attempts === 4 
        ? "You Can’t Escape Love 😌❤️😂" 
        : FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];

    const newMsg: FloatingMessage = {
      id: Date.now(),
      text: msgText,
      x: Math.random() * (window.innerWidth - 200), // Random horizontal
      y: Math.random() * (window.innerHeight - 100), // Random vertical
    };

    setFloatingMessages((prev) => [...prev, newMsg]);

    // Cleanup message after animation
    setTimeout(() => {
        if (isMounted.current) {
            setFloatingMessages((prev) => prev.filter(m => m.id !== newMsg.id));
        }
    }, 2000);

  }, [attempts]);

  // Desktop hover handler
  const handleMouseEnter = () => {
    moveNoButton();
  };

  // Mobile touch handler (prevent default click)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevents the click from firing on some devices
    moveNoButton();
  };

  const playClickSound = () => {
    if (soundEnabled) {
      // Logic for sound would go here. 
      // Using visual feedback primarily.
    }
  };

  const handleYesClick = () => {
    playClickSound();
    onSuccess();
  };

  const getNoButtonStyles = () => {
    const baseStyle: React.CSSProperties = {
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      position: isMoved ? 'fixed' : 'static',
    };

    if (isMoved) {
      baseStyle.left = `${noBtnPosition.x}px`;
      baseStyle.top = `${noBtnPosition.y}px`;
      baseStyle.zIndex = 50; // Ensure it floats above
    }

    // Shrinking logic
    const scale = Math.max(0.4, 1 - attempts * 0.1); 
    baseStyle.transform = `scale(${scale})`;
    
    if (attempts >= 7) {
        baseStyle.opacity = 0;
        baseStyle.pointerEvents = 'none';
        baseStyle.transform = `scale(0) rotate(720deg)`;
    }

    return baseStyle;
  };

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-md p-6 mx-auto text-center">
        
      {/* Sound Toggle */}
      <button 
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-0 right-0 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Toggle Sound"
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>

      {/* Main Card */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl animate-fade-in ring-1 ring-white/50">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md mb-4 leading-tight">
          Will You Be My <br/>
          <span className="text-pink-200">Valentine Forever?</span> <br/>
          😏❤️
        </h1>

        <p className="text-white/90 text-sm md:text-base font-medium mb-8 italic">
          Think carefully… this is a lifetime contract 😂💍
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative min-h-[120px]">
          
          {/* YES Button */}
          <button
            onClick={handleYesClick}
            className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,105,180,0.6)] transform hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-fast overflow-hidden"
          >
            <span className="relative z-10 text-xl flex items-center gap-2">
                <span className="drop-shadow-sm">YES</span>
                {/* Micro-animations for emojis */}
                <span className="inline-block animate-wiggle origin-bottom" style={{ animationDuration: '2s', animationDelay: '0s' }}>😍</span>
                <span className="inline-block animate-bounce-slight" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💖</span>
            </span>
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
          </button>

          {/* NO Button */}
          <button
            ref={noBtnRef}
            style={getNoButtonStyles()}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            className="bg-gray-800/80 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full shadow-lg whitespace-nowrap border border-white/20 cursor-pointer"
          >
            NO 😅💔
          </button>

        </div>

        {/* Attempts Message (Appears after trying to click NO a few times) */}
        {attempts >= 5 && attempts < 7 && (
           <div className="mt-6 text-yellow-200 font-bold text-lg animate-bounce-slight drop-shadow-md">
             You Can’t Escape Love 😌❤️😂
           </div>
        )}

      </div>

      {/* Floating Funny Messages */}
      {floatingMessages.map((msg) => (
        <div
            key={msg.id}
            className="fixed pointer-events-none text-white font-bold text-lg md:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] z-50 animate-bounce-slight"
            style={{ 
                left: msg.x, 
                top: msg.y,
                animation: 'float 2s ease-out' 
            }}
        >
            {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ProposalCard;