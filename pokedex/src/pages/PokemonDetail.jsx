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

  if (loading) return <div>Cargando...</div>;
  if (!pokemon) return <div>Pokémon no encontrado</div>;

  const mainType = pokemon.types[0].type.name;
  const bgGradient = typeColors[mainType];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <button
          onClick={() => navigate('/pokedex')}
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded-full"
        >
          Volver
        </button>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
          <div className={`bg-gradient-to-b ${bgGradient} p-6 text-center`}>
            <img 
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-40 h-40 mx-auto"
            />
            <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
            <p>#{String(pokemon.id).padStart(3, '0')}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-bold">Altura</p>
                <p>{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="font-bold">Peso</p>
                <p>{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="font-bold mb-2">Tipos</p>
              <div className="flex gap-2">
                {pokemon.types.map(type => (
                  <span 
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full ${typeColors[type.type.name]} capitalize`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {}
            <div className="mb-4">
              <p className="font-bold mb-2">Habilidades</p>
              <div className="flex gap-2">
                {pokemon.abilities.map(ability => (
                  <span 
                    key={ability.ability.name}
                    className="px-3 py-1 bg-gray-100 rounded-full capitalize"
                  >
                    {ability.ability.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-bold mb-2">Estadísticas</p>
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="mb-2">
                  <div className="flex justify-between">
                    <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${bgGradient}`}
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