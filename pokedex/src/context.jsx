import { createContext, useContext, useReducer } from 'react';

const PokemonContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRAINER':
      return {
        ...state,
        trainer: action.payload,
        currentPage: 'pokedex'
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
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}


export function PokemonProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    currentPage: 'home',
    trainer: '',
    pokemons: [],
    loading: false,
    error: null
  });

  const fetchPokemons = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      if (!response.ok) throw new Error('No se pudieron cargar los Pokémon');
      const data = await response.json();
      dispatch({ type: 'SET_POKEMONS', payload: data.results });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const setTrainer = (name) => {
    localStorage.setItem('trainerName', name);
    dispatch({ type: 'SET_TRAINER', payload: name });
  };

  const value = {
    ...state,
    setTrainer,
    fetchPokemons
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemon debe usarse dentro de un PokemonProvider');
  }
  return context;
}