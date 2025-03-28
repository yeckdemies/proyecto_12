import React from 'react';
import './Card.css';

const Card = ({ card, onClick }) => {
  console.log('Renderizando carta', card.cardId);
  const handleClick = () => {
    if (!card.matched) {
      onClick(card.cardId);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !card.matched) {
      onClick(card.cardId);
    }
  };

  return (
    <article
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      role='button'
      tabIndex='0'
      aria-label={`Carta de ${card.name}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-disabled={card.matched}
    >
      <div className='card-inner'>
        <div className='card-front'>
          <img src={card.image} alt={card.name} />
        </div>
        <div className='card-back'></div>
      </div>
    </article>
  );
};

export default Card;
