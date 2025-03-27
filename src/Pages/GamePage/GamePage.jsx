import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPokemonCards from '../../Hooks/useFetchPokemonCards';
import Card from '../../Components/Card/Card';
import Timer from '../../Components/Timer/Timer';
import Score from '../../Components/Score/Score';
import GameOver from '../../Components/GameOver/GameOver';
import './GamePage.css';

const GamePage = () => {
  const navigate = useNavigate();

  const [gameSettings] = useState(() => {
    const settings = localStorage.getItem('gameSettings');
    return settings ? JSON.parse(settings) : null;
  });

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameSettings) {
      navigate('/setuppage');
    }
  }, [gameSettings, navigate]);

  const pairsCount = gameSettings ? gameSettings.pairs : 0;
  const { cards, loading, error } = useFetchPokemonCards(pairsCount);

  const [gameCards, setGameCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [previewActive, setPreviewActive] = useState(true);
  const [previewDone, setPreviewDone] = useState(false);

  useEffect(() => {
    if (!loading && cards.length > 0 && !previewDone) {
      const revealed = cards.map((card) => ({
        ...card,
        flipped: true,
        matched: false
      }));
      setGameCards(revealed);
      setPreviewActive(true);

      let timerDuration = 2000;
      if (gameSettings.difficulty === 'medium') timerDuration = 3000;
      else if (gameSettings.difficulty === 'hard') timerDuration = 4000;

      const timer = setTimeout(() => {
        const hidden = cards.map((card) => ({
          ...card,
          flipped: false,
          matched: false
        }));
        setGameCards(hidden);
        setPreviewActive(false);
        setPreviewDone(true);
      }, timerDuration);

      return () => clearTimeout(timer);
    }
  }, [loading, cards, gameSettings, previewDone]);

  const handleCardClick = (cardId) => {
    if (previewActive || gameOver) return;

    const clickedCard = gameCards.find((card) => card.cardId === cardId);
    if (!clickedCard || clickedCard.matched || selectedCards.includes(cardId))
      return;
    if (selectedCards.length === 2) return;

    setGameCards((prevCards) =>
      prevCards.map((card) =>
        card.cardId === cardId ? { ...card, flipped: true } : card
      )
    );
    setSelectedCards((prev) => [...prev, cardId]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstId, secondId] = selectedCards;
      const firstCard = gameCards.find((card) => card.cardId === firstId);
      const secondCard = gameCards.find((card) => card.cardId === secondId);
      if (!firstCard || !secondCard) return;

      if (firstCard.id === secondCard.id) {
        setGameCards((prevCards) =>
          prevCards.map((card) =>
            card.cardId === firstId || card.cardId === secondId
              ? { ...card, matched: true }
              : card
          )
        );
        setSelectedCards([]);
        setScore((prev) => prev + 10);
      } else {
        setTimeout(() => {
          setGameCards((prevCards) =>
            prevCards.map((card) =>
              card.cardId === firstId || card.cardId === secondId
                ? { ...card, flipped: false }
                : card
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards, gameCards]);

  useEffect(() => {
    const allMatched =
      gameCards.length > 0 && gameCards.every((card) => card.matched);
    if (allMatched && previewDone) {
      setGameOver(true);
    }
  }, [gameCards, previewDone]);

  useEffect(() => {
    if (gameOver) {
      const scores = JSON.parse(localStorage.getItem('scores')) || [];
      const userData = JSON.parse(localStorage.getItem('userData'));

      const newScore = {
        name: userData?.name || 'Anónimo',
        age: userData?.age || 'N/A',
        score,
        date: new Date().toLocaleString(),
        difficulty: gameSettings.difficulty
      };

      localStorage.setItem('scores', JSON.stringify([...scores, newScore]));
    }
  }, [gameOver]);

  if (loading) return <p>Cargando cartas...</p>;
  if (error) return <p>Error al cargar las cartas: {error.message}</p>;

  return (
    <div className='game-page'>
      <header className='game-header'>
        <h1 className='game-title'>Juego de Memoria</h1>
        <div className='game-stats'>
          <Score points={score} />
          {!previewActive && previewDone && (
            <Timer
              initialSeconds={gameSettings.time}
              paused={previewActive}
              onTimeUp={() => setGameOver(true)}
            />
          )}
        </div>
      </header>

      <section className='board'>
        {gameCards.map((card) => (
          <Card
            key={card.cardId}
            card={card}
            onClick={() => handleCardClick(card.cardId)}
          />
        ))}
      </section>

      {gameOver && (
        <GameOver
          score={score}
          onRestart={() => window.location.reload()}
          onViewScores={() => navigate('/scorespage')}
        />
      )}
    </div>
  );
};

export default GamePage;
