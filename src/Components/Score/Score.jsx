import React from 'react';
import './Score.css';

const Score = ({ points }) => {
  return (
    <div className='score-container'>
      <p className='score-label'>Score:</p>
      <span className='score-points'>{points}</span>
    </div>
  );
};

export default Score;
