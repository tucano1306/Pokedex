import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const typeColors = {
  normal: 'from-gray-200 to-gray-100',
  fire: 'from-red-200 to-red-100',
  water: 'from-blue-200 to-blue-100',
  grass: 'from-green-200 to-green-100',
  electric: 'from-yellow-200 to-yellow-100',
  ice: 'from-cyan-200 to-cyan-100',
  fighting: 'from-red-300 to-red-200',
  poison: 'from-purple-200 to-purple-100',
  ground: 'from-yellow-600 to-yellow-500',
  flying: 'from-purple-300 to-purple-200',
  psychic: 'from-pink-200 to-pink-100',
  bug: 'from-lime-200 to-lime-100',
  rock: 'from-yellow-800 to-yellow-700',
  ghost: 'from-purple-400 to-purple-300',
  dragon: 'from-indigo-400 to-indigo-300',
  dark: 'from-gray-800 to-gray-700',
  steel: 'from-gray-400 to-gray-300',
  fairy: 'from-pink-300 to-pink-200'
};

export default function PokemonCard({ pokemon, isDarkMode }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    setIsSelected(true);
    setTimeout(() => {
      navigate(`/pokedex/${pokemon.id}`);
    }, 5500);
  };

  
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const bgGradient = typeColors[mainType] || typeColors.normal;

  const stats = [
    { stat: { name: 'hp'}, base_stat: pokemon.hp || 0 },
    { stat: { name: 'attack'}, base_stat: pokemon.attack || 0 },
    { stat: { name: 'defense'}, base_stat: pokemon.defense || 0 },
    { stat: { name: 'speed'}, base_stat: pokemon.speed || 0 }
  ];

  return (
    <article 
      onClick={handleNavigate} 
      className={`relative cursor-pointer transition-all duration-500 ${
        isSelected ? 'z-50' : 'z-0'
      }`}
    >
      <div 
        className={`rounded-lg p-4 transition-all duration-300 ${
          isSelected ? 
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl w-80 h-96' : 
          'shadow-md hover:shadow-xl'
        }`}
      >
        {}
        <div className={`bg-gradient-to-b ${bgGradient} rounded-lg p-4`}>
          {}
          <img 
            src={pokemon.sprite}
            alt={pokemon.name}
            className={`mx-auto transition-all duration-500 ${
              isSelected ? 
              'w-64 h-64 rounded-full transform rotate-360 animate-pokemon-selected' : 
              'w-32 h-32'
            }`}
          />
          
          {}
          <h2 className={`text-center capitalize mt-2 ${
            isSelected ? 'text-2xl font-bold' : 'text-lg font-semibold'
          }`}>
            {pokemon.name}
          </h2>

          {}
          <div className="flex justify-center gap-2 mt-2">
            {pokemon.types?.map((type) => (
              <span 
                key={type.type.name}
                className={`px-2 py-1 text-sm rounded-full ${
                  typeColors[type.type.name]
                } capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {stats.map((stat) => (
              <div key={stat.stat.name} className="text-center p-1 bg-white bg-opacity-75 rounded">
                <span className="text-gray-600 capitalize">
                  {stat.stat.name}
                </span>
                <p className="font-semibold">{stat.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {}
      {isSelected && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60"
          onClick={(e) => {
            e.stopPropagation();
            setIsSelected(false);
          }}
        />
      )}
    </article>
  );
}