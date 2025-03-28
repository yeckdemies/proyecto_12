export const initialGameState = {
  score: 0,
  gameOver: false,
  gameCards: [],
  selectedCards: [],
  previewActive: true,
  previewDone: false,
};

export function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, gameCards: action.payload };

    case 'FLIP_CARD':
      return {
        ...state,
        gameCards: state.gameCards.map((card) =>
          card.cardId === action.payload ? { ...card, flipped: true } : card
        ),
        selectedCards: [...state.selectedCards, action.payload],
      };

    case 'UNFLIP_CARDS':
      return {
        ...state,
        gameCards: state.gameCards.map((card) =>
          state.selectedCards.includes(card.cardId)
            ? { ...card, flipped: false }
            : card
        ),
        selectedCards: [],
      };

    case 'MATCH_CARDS':
      return {
        ...state,
        gameCards: state.gameCards.map((card) =>
          state.selectedCards.includes(card.cardId)
            ? { ...card, matched: true }
            : card
        ),
        selectedCards: [],
        score: state.score + 10,
      };

    case 'PREVIEW_DONE':
      return { ...state, previewActive: false, previewDone: true };

    case 'GAME_OVER':
      return { ...state, gameOver: true };

    case 'RESET':
      return initialGameState;

    default:
      return state;
  }
}
