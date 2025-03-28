import React from 'react';
import './GameOver.css';

const GameOver = ({ score, onRestart, onViewScores }) => {
  console.log('Renderizando GameOver');
  return (
    <div className='gameover-overlay'>
      <div className='gameover-modal'>
        <h2 className='gameover-title'>¡Fin del Juego!</h2>
        <p className='gameover-score'>
          Tu puntuación: <strong>{score} puntos</strong>
        </p>
        <div className='gameover-buttons'>
          <button onClick={onRestart}>Volver a Jugar</button>
          <button onClick={onViewScores} className='secondary'>
            Clasificación Global
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
