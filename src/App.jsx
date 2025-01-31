// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';

const cardImages = [
  { src: "🐶", matched: false },
  { src: "🐱", matched: false },
  { src: "🐼", matched: false },
  { src: "🦊", matched: false },
  { src: "🦁", matched: false },
  { src: "🐯", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [score, setScore] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));
    
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setScore(prevScore => prevScore + 10);
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  };

  // start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="stats">
        <p>Turns: {turns}</p>
        <p>Score: {score}</p>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <div 
            className={`card ${card === choiceOne || card === choiceTwo || card.matched ? 'flipped' : ''}`}
            key={card.id}
            onClick={() => handleChoice(card)}
          >
            <div className="inner">
              <div className="front">{card.src}</div>
              <div className="back">❓</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
