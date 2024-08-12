
import React, { useState } from 'react';

const FlipCardManager = ({ onAddCard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddCard = () => {
    if (question && answer) {
      onAddCard(question, answer);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <div className="mb-4  ">
      <input 
        type="text" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Enter question" 
        className="border p-2 mr-2 rounded-lg border border-blue-700"
      />
      <input 
        type="text" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
        placeholder="Enter answer" 
        className="border p-2 mr-2 rounded-lg border border-blue-700"
      />
      <button 
        onClick={handleAddCard} 
        className="bg-green-300 text-white p-2 rounded-lg border border-blue-700 hover:shadow-lg hover:shadow-green-400 transition-shadow duration-300"
      >
        Add Flip Card
      </button>
    </div>
  );
};

export default FlipCardManager;
