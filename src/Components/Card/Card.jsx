import React from 'react';
import './Card.css';

const Card = ({ card, cardId, onClick }) => {
  console.log('Renderizando carta', card.cardId);

  const handleClick = () => {
    if (!card.matched) {
      onClick(cardId);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !card.matched) {
      onClick(cardId);
    }
  };

  return (
    <article
      className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
      role='button'
      tabIndex='0'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Carta de ${card.name}`}
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

const areEqual = (prevProps, nextProps) =>
  prevProps.card.flipped === nextProps.card.flipped &&
  prevProps.card.matched === nextProps.card.matched;

export default React.memo(Card, areEqual);
