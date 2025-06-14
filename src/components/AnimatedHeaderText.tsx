
import React, { useState, useEffect } from 'react';

// Couleurs utilisées pour l'animation du gradient, similaires à XDoseLogo
const ANIMATION_COLORS = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-green-500',
  'from-green-500 to-yellow-500',
  'from-red-500 to-orange-500',
];

interface AnimatedHeaderTextProps {
  text: string;
  className?: string;
}

const AnimatedHeaderText: React.FC<AnimatedHeaderTextProps> = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isHovered) {
      interval = setInterval(() => {
        setColorIndex((prev) => (prev + 1) % ANIMATION_COLORS.length);
      }, 700);
    } else {
      setColorIndex(0); // Réinitialise à la première couleur quand on ne survole plus
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1
        className={`font-bold text-3xl transition-all duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
      >
        <span
          className={`bg-gradient-to-r ${ANIMATION_COLORS[colorIndex]} bg-clip-text text-transparent transition-all duration-700`}
        >
          {text}
        </span>
      </h1>
      <div
        className={`h-1 bg-gradient-to-r ${ANIMATION_COLORS[colorIndex]} rounded-full mt-1 transition-all duration-500 ${
          isHovered ? 'w-full' : 'w-0'
        }`}
      />
    </div>
  );
};

export default AnimatedHeaderText;
