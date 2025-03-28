import React from 'react';
import './Score.css';

const Score = React.memo(({ points }) => {
  console.log('Renderizando Score');
  return (
    <section className='score-container'>
      <p className='score-label'>Score:</p>
      <span className='score-points'>{points}</span>
    </section>
  );
});

export default Score;
