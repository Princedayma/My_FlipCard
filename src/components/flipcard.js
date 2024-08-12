import React, { useState } from 'react';

const FlipCard = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className="relative w-64 h-64 perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''} rounded-lg shadow-md shadow `}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center backface-hidden rounded-lg border border-gray-300  hover:animate-ping shadow-cyan-200 transition-shadow duration-300">
          <h2 className="text-xl font-bold">{question}</h2>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full bg-gray-800 flex items-center justify-center backface-hidden transform rotate-y-180 rounded-lg border border-blue-700">
          <h2 className="text-xl text-white font-semibold mx-1">{answer}</h2>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
