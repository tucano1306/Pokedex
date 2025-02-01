import { createContext, useContext, useReducer } from 'react';

const PokemonContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRAINER':
      return {
        ...state,
        trainer: action.payload
      };
    case 'SET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}

export function PokemonProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    trainer: '',
    pokemons: [],
    loading: false,
    currentPage: 1,
    pokemonsPerPage: 8
  });

  const fetchPokemons = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();

      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const detail = await detailResponse.json();
          return {
            id: detail.id,
            name: detail.name,
            types: detail.types,
            sprite: detail.sprites.front_default,
            
            hp: detail.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
            attack: detail.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
            defense: detail.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
            speed: detail.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
            
            stats: detail.stats
          };
        })
      );

      dispatch({ type: 'SET_POKEMONS', payload: pokemonsWithDetails });
    } catch (error) {
      console.error("Error fetching pokemon:", error);
    }
  };

  const setTrainer = (name) => {
    dispatch({ type: 'SET_TRAINER', payload: name });
  };

  const setPage = (pageNumber) => {
    dispatch({ type: 'SET_PAGE', payload: pageNumber });
  };

  return (
    <PokemonContext.Provider
      value={{
        ...state,
        setTrainer,
        fetchPokemons,
        setPage
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}