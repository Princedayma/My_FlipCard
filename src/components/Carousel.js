import React, { useState, useEffect } from 'react';
import FlipCard from './flipcard';
import FlipCardManager from './flipcardmanager';
import axios from 'axios';

const Carousel = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/flipcards').then((response) => {
      setCards(response.data);
    });
  }, []);

  const handleAddCard = (question, answer) => {
    axios.post('http://localhost:5000/flipcards', { question, answer }).then((response) => {
      setCards([...cards, response.data]);
    });
  };

  const handleEditCard = (index, question, answer) => {
    const card = cards[index];
    axios.put(`http://localhost:5000/flipcards/${card.id}`, { question, answer }).then(() => {
      const updatedCards = cards.map((card, i) =>
        i === index ? { ...card, question, answer } : card
      );
      setCards(updatedCards);
    });
  };

  const handleDeleteCard = (index) => {
    const card = cards[index];
    axios.delete(`http://localhost:5000/flipcards/${card.id}`).then(() => {
      const updatedCards = cards.filter((_, i) => i !== index);
      setCards(updatedCards);
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    });
  };

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? cards.length - 3 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex >= cards.length - 3;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="p-4">
      <FlipCardManager onAddCard={handleAddCard} />

      <div className="relative w-full overflow-hidden mt-4">
        <div className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="min-w-1/3 p-4 relative">
              <FlipCard question={card.question} answer={card.answer} />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
                <button
                  onClick={() => handleEditCard(index, prompt('Enter new question:', card.question), prompt('Enter new answer:', card.answer))}
                  className="bg-gray-800 text-white p-1 rounded-lg border-indigo-600 shadow-yellow-300 shadow-md	hover:shadow-lg hover:shadow-yellow-400 transition-shadow duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCard(index)}
              className="bg-gray-800 text-white p-1 rounded-lg border border-indigo-600 shadow-red-300  shadow-md hover:shadow-lg hover:shadow-red-400 transition-shadow duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full border-green-500 hover: animate-bounce shadow-lg hover:shadow-yellow-200 transition-shadow duration-300"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full hover:shadow-lg hover: animate-bounce shadow-yellow-200 transition-shadow duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
