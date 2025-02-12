import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header/Header';

const typeColors = {
  normal: 'from-gray-200 to-gray-100',
  fire: 'from-red-200 to-red-100',
  water: 'from-blue-200 to-blue-100',
  grass: 'from-green-200 to-green-100',
  electric: 'from-yellow-200 to-yellow-100',
  fighting: 'from-red-300 to-red-200',
  poison: 'from-purple-200 to-purple-100',
  ground: 'from-yellow-600 to-yellow-500',
  flying: 'from-purple-300 to-purple-200',
  psychic: 'from-pink-200 to-pink-100',
  bug: 'from-lime-200 to-lime-100',
  dragon: 'from-indigo-400 to-indigo-300',
  ghost: 'from-purple-400 to-purple-300',
  fairy: 'from-pink-300 to-pink-200'
};

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon no encontrado');
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/pokemon.back.jpg')`
           }}>
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
           style={{
             backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/pokemon.back.jpg')`
           }}>
        <div className="text-white text-lg">Pokémon no encontrado</div>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const bgGradient = typeColors[mainType];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed"
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/pokemon.back.jpg')`
         }}>
      <Header />
      <div className="container mx-auto p-3">
        <button
          onClick={() => navigate('/pokedex')}
          className="mb-3 px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 text-sm shadow-lg"
        >
          Volver
        </button>

        <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
          <div className={`bg-gradient-to-b ${bgGradient} p-4 text-center rounded-t-lg`}>
            <img 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-28 h-28 mx-auto drop-shadow-lg"
            />
            <h1 className="text-2xl font-bold capitalize mb-1">{pokemon.name}</h1>
            <p className="text-base font-semibold">#{String(pokemon.id).padStart(3, '0')}</p>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-2 bg-white/50 rounded-lg">
                <p className="font-bold text-sm mb-1">Altura</p>
                <p className="text-base">{pokemon.height / 10} m</p>
              </div>
              <div className="text-center p-2 bg-white/50 rounded-lg">
                <p className="font-bold text-sm mb-1">Peso</p>
                <p className="text-base">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold text-sm mb-2">Tipos</p>
              <div className="flex gap-2">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full ${typeColors[type.type.name]} capitalize text-sm font-medium shadow-md`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold text-sm mb-2">Habilidades</p>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map(ability => (
                  <span 
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-100 rounded-full capitalize text-sm font-medium shadow-md"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold text-sm mb-2">Estadísticas</p>
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize text-sm font-medium">{stat.stat.name.replace('-', ' ')}</span>
                    <span className="font-bold text-sm">{stat.base_stat}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${bgGradient} transition-all duration-500 ease-out`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}