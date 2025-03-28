import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetupPage.css';

const SetupPage = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState('easy');

  const handleSubmit = (e) => {
    e.preventDefault();

    let pairs;
    let time;
    if (difficulty === 'easy') {
      pairs = 4;
      time = 30;
    } else if (difficulty === 'medium') {
      pairs = 5;
      time = 30;
    } else if (difficulty === 'hard') {
      pairs = 6;
      time = 30;
    }

    localStorage.setItem(
      'gameSettings',
      JSON.stringify({ difficulty, pairs, time })
    );

    navigate('/gamepage');
  };

  return (
    <main className='setup-page'>
      <h1 className='setup-title'>Configuración del Juego</h1>
      <form className='setup-form' onSubmit={handleSubmit}>
        <section className='setup-item'>
          <label>Temática:</label>
          <span>Memo-Pockemon</span>
        </section>
        <section className='setup-item'>
          <label>Nivel de Dificultad:</label>
          <div className='difficulty-options'>
            <label>
              <input
                type='radio'
                name='difficulty'
                value='easy'
                checked={difficulty === 'easy'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Fácil
            </label>
            <label>
              <input
                type='radio'
                name='difficulty'
                value='medium'
                checked={difficulty === 'medium'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Medio
            </label>
            <label>
              <input
                type='radio'
                name='difficulty'
                value='hard'
                checked={difficulty === 'hard'}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Avanzado
            </label>
          </div>
        </section>
        <button type='submit' className='setup-button'>
          Iniciar Juego
        </button>
      </form>
    </main>
  );
};

export default SetupPage;
