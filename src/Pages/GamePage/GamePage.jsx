import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPokemonCards from '../../Hooks/useFetchPokemonCards';
import Card from '../../Components/Card/Card';
import Timer from '../../Components/Timer/Timer';
import Score from '../../Components/Score/Score';
import GameOver from '../../Components/GameOver/GameOver';

import { gameReducer, initialGameState } from '../../Reducers/gameReducer';
import './GamePage.css';

const GamePage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const [gameSettings] = useState(() => {
    const settings = localStorage.getItem('gameSettings');
    return settings ? JSON.parse(settings) : null;
  });

  useEffect(() => {
    if (!gameSettings) navigate('/setuppage');
  }, [gameSettings, navigate]);

  const { cards, loading, error } = useFetchPokemonCards(
    gameSettings?.pairs || 0
  );

  useEffect(() => {
    if (!loading && cards.length > 0 && !state.previewDone) {
      const revealed = cards.map((card) => ({
        ...card,
        flipped: true,
        matched: false
      }));
      dispatch({ type: 'SET_CARDS', payload: revealed });

      const time =
        gameSettings.difficulty === 'medium'
          ? 3000
          : gameSettings.difficulty === 'hard'
          ? 4000
          : 2000;

      const timer = setTimeout(() => {
        const hidden = cards.map((card) => ({
          ...card,
          flipped: false,
          matched: false
        }));
        dispatch({ type: 'SET_CARDS', payload: hidden });
        dispatch({ type: 'PREVIEW_DONE' });
      }, time);

      return () => clearTimeout(timer);
    }
  }, [loading, cards, gameSettings, state.previewDone]);

  const handleCardClick = useCallback(
    (cardId) => {
      if (state.previewActive || state.gameOver) return;

      const clicked = state.gameCards.find((card) => card.cardId === cardId);
      if (!clicked || clicked.matched || state.selectedCards.includes(cardId))
        return;
      if (state.selectedCards.length === 2) return;

      dispatch({ type: 'FLIP_CARD', payload: cardId });
    },
    [state.previewActive, state.gameOver, state.gameCards, state.selectedCards]
  );

  useEffect(() => {
    if (state.selectedCards.length === 2) {
      const [id1, id2] = state.selectedCards;
      const c1 = state.gameCards.find((c) => c.cardId === id1);
      const c2 = state.gameCards.find((c) => c.cardId === id2);

      if (!c1 || !c2) return;

      if (c1.id === c2.id) {
        dispatch({ type: 'MATCH_CARDS' });
      } else {
        setTimeout(() => dispatch({ type: 'UNFLIP_CARDS' }), 1000);
      }
    }
  }, [state.selectedCards, state.gameCards]);

  useEffect(() => {
    const allMatched =
      state.gameCards.length > 0 &&
      state.gameCards.every((card) => card.matched);
    if (allMatched && state.previewDone) {
      dispatch({ type: 'GAME_OVER' });
    }
  }, [state.gameCards, state.previewDone]);

  useEffect(() => {
    if (state.gameOver) {
      const scores = JSON.parse(localStorage.getItem('scores')) || [];
      const userData = JSON.parse(localStorage.getItem('userData'));

      const newScore = {
        name: userData?.name || 'Anónimo',
        age: userData?.age || 'N/A',
        score: state.score,
        date: new Date().toLocaleString(),
        difficulty: gameSettings.difficulty
      };

      localStorage.setItem('scores', JSON.stringify([...scores, newScore]));
    }
  }, [state.gameOver, state.score, gameSettings]);

  if (loading) return <p>Cargando cartas...</p>;
  if (error) return <p>Error al cargar las cartas: {error.message}</p>;

  return (
    <main className='game-page'>
      <section className='game-header'>
        <h1 className='game-title'>Juego de Memoria</h1>
        <article className='game-stats'>
          <Score points={state.score} />
          {!state.previewActive && state.previewDone && (
            <Timer
              initialSeconds={gameSettings.time}
              onTimeUp={() => dispatch({ type: 'GAME_OVER' })}
              active={!state.gameOver}
            />
          )}
        </article>
      </section>

      <section className='board'>
        {state.gameCards.map((card) => (
          <Card
            key={card.cardId}
            card={card}
            onClick={() => handleCardClick(card.cardId)}
          />
        ))}
      </section>

      {state.gameOver && (
        <GameOver
          score={state.score}
          onRestart={() => window.location.reload()}
          onViewScores={() => navigate('/scorespage')}
        />
      )}
    </main>
  );
};

export default GamePage;
