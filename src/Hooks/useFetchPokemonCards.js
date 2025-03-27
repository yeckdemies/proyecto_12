import { useState, useEffect } from 'react';

const useFetchPokemonCards = (pairsCount) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const maxPokemon = 150;
        const selectedIDs = [];
        while (selectedIDs.length < pairsCount) {
          const randomId = Math.floor(Math.random() * maxPokemon) + 1;
          if (!selectedIDs.includes(randomId)) {
            selectedIDs.push(randomId);
          }
        }

        const pokemonPromises = selectedIDs.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
            res.json()
          )
        );
        const pokemons = await Promise.all(pokemonPromises);

        const images = pokemons.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.home.front_default
        }));

        let cardsArray = [...images, ...images];

        cardsArray = cardsArray.map((card, index) => ({
          ...card,
          cardId: index,
          flipped: false,
          matched: false
        }));

        cardsArray.sort(() => Math.random() - 0.5);
        setCards(cardsArray);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, [pairsCount]);

  return { cards, loading, error };
};

export default useFetchPokemonCards;
