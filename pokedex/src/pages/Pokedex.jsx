import { useEffect, useState } from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonCard from '../card/PokemonCard';

export default function Pokedex() {
  const { trainer, pokemons, loading, error, fetchPokemons } = usePokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos los pokemones');
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 8;

  useEffect(() => {
    fetchPokemons();
  }, []);

  // Filtrar pokémon por búsqueda y tipo
  const filteredPokemons = pokemons.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos los pokemones' || 
      pokemon.types.some(type => type.type.name === selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  // Cálculos para la paginación
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  // Restablecer la página cuando se aplica un filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Bienvenido {trainer} a tu Pokédex
      </h1>

      {/* Búsqueda y filtros */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Busca un pokemón"
        />
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Todos los pokemones">Todos los pokemones</option>
          <option value="normal">Normal</option>
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="grass">Planta</option>
          <option value="flying">Volador</option>
          <option value="fighting">Luchador</option>
          <option value="poison">Veneno</option>
          <option value="electric">Eléctrico</option>
          <option value="ground">Tierra</option>
          <option value="rock">Roca</option>
          <option value="psychic">Psíquico</option>
          <option value="ice">Hielo</option>
          <option value="bug">Bicho</option>
          <option value="ghost">Fantasma</option>
          <option value="steel">Acero</option>
          <option value="dragon">Dragón</option>
          <option value="dark">Siniestro</option>
          <option value="fairy">Hada</option>
        </select>
      </div>

      {/* Grid de Pokémon */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {currentPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}