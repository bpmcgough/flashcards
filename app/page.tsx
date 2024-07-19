'use client';

import React, { useState } from 'react';
import flashcards from './spanish_words.json';

export default function FlashcardApp() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isDeckCompleted, setIsDeckCompleted] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    } else {
      setIsDeckCompleted(true);
    }
  };

  const restartDeck = () => {
    setCurrentCard(0);
    setCorrectAnswers(0);
    setIsFlipped(false);
    setIsDeckCompleted(false);
  };

  return (
    <div className="container">
      <main>
        {!isDeckCompleted ? (
          <>
            <h1>Spanish Flashcards</h1>
            <p>Correct Answers: {correctAnswers}</p>
            <div className="flashcard" onClick={flipCard}>
              {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
            </div>
            {isFlipped && (
              <div className="buttons">
                <button onClick={() => handleAnswer(true)}>✓</button>
                <button onClick={() => handleAnswer(false)}>✗</button>
              </div>
            )}
          </>
        ) : (
          <div className="completed">
            <h2>Deck Completed!</h2>
            <p>You got {correctAnswers} out of {flashcards.length} correct.</p>
            <button onClick={restartDeck}>Start Over</button>
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        main {
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .flashcard {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        button {
          font-size: 24px;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:first-child {
          background-color: #4caf50;
          color: white;
        }
        button:last-child {
          background-color: #f44336;
          color: white;
        }
        .completed {
          text-align: center;
        }
        .completed button {
          background-color: #2196f3;
          color: white;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}