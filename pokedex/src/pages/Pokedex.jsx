import { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../card/PokemonCard';
import Header from '../header/Header';

export default function Pokedex() {
  const { trainer, pokemons, loading, error, fetchPokemons } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos los pokemones');
  const [searchError, setSearchError] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchPokemons();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const pokemonTypes = [
    'Todos los pokemones',
    'normal',    
    'fighting',  
    'flying',    
    'poison',    
    'ground',    
    'rock',     
    'bug',       
    'ghost',   
    'steel',     
    'fire',     
    'water',     
    'grass',    
    'electric',  
    'psychic',  
    'ice',      
    'dragon', 
    'dark',    
    'fairy'     
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0 && value.length < 3) {
      setSearchError('Ingresa al menos 3 caracteres');
    } else {
      setSearchError('');
    }
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos los pokemones' || 
      pokemon.types.some(type => type.type.name === selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div 
      className={`min-h-screen bg-cover bg-center bg-fixed ${isDarkMode ? 'text-white' : 'text-black'}`} 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/pokemon.ball.jpg')`
      }}
    >
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="max-w-7xl mx-auto backdrop-blur-sm bg-white/10 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Bienvenido {trainer} a tu Pokédex
            </h1>
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Busca un pokemón"
                className={`w-full p-2 rounded border transition-colors duration-200 ${
                  searchError ? 'border-red-500' : 'border-gray-300'
                } ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white placeholder-gray-400' 
                    : 'bg-white text-black placeholder-gray-500'
                }`}
              />
              {searchError && (
                <p className="text-red-500 text-sm mt-1">{searchError}</p>
              )}
            </div>
  
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`p-2 rounded border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-600' 
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              {pokemonTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'Todos los pokemones' 
                    ? type 
                    : type.charAt(0).toUpperCase() + type.slice(1)
                  }
                </option>
              ))}
            </select>
  
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={`p-2 rounded border transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 text-white border-gray-600' 
                  : 'bg-white text-black border-gray-300'
              }`}
            >
              <option value={8}>8 por página</option>
              <option value={12}>12 por página</option>
              <option value={16}>16 por página</option>
              <option value={20}>20 por página</option>
            </select>
          </div>
  
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentPokemons.map(pokemon => (
                  <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
  
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-red-600 text-white hover:bg-red-500'
                        : isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}