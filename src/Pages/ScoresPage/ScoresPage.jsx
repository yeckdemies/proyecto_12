import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScoresPage.css';

const ScoresPage = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(storedScores.reverse());
  }, []);

  return (
    <div className='scores-page'>
      <h1 className='scores-title'>Clasificación Global</h1>

      {scores.length === 0 ? (
        <p>No hay puntuaciones aún.</p>
      ) : (
        <div className='scores-table'>
          <div className='scores-row scores-header'>
            <div>Nombre</div>
            <div>Edad</div>
            <div>Dificultad</div>
            <div>Fecha</div>
            <div>Puntos</div>
          </div>

          {scores.map((score, index) => (
            <div className='scores-row' key={index}>
              <div>{score.name}</div>
              <div>{score.age}</div>
              <div>{score.difficulty}</div>
              <div>{score.date}</div>
              <div>{score.score}</div>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate('/')} className='back-button'>
        Volver al inicio
      </button>
    </div>
  );
};

export default ScoresPage;
