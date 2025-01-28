// PokemonCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PokemonCard({ pokemon }) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const handleNavigate = () => {
    // Primero mostramos la animación y después navegamos
    setIsSelected(true);
    setTimeout(() => {
      navigate(`/pokedex/${pokemon.id}`);
    }, 700); // Este tiempo debe coincidir con la duración de tu animación
  };

  return (
    <div 
      onClick={handleNavigate}
      className={`relative cursor-pointer transition-all duration-500 ${
        isSelected ? 'z-50' : 'z-0'
      }`}
    >
      <div 
        className={`bg-white rounded-lg p-4 transition-all duration-300 ${
          isSelected ? 
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl w-80 h-96' : 
          'shadow-sm'
        }`}
      >
        <img 
          src={pokemon.sprite}
          alt={pokemon.name}
          className={`mx-auto transition-all duration-500 ${
            isSelected ? 
            'w-64 h-64 rounded-full transform rotate-360 animate-pokemon-selected' : 
            'w-32 h-32'
          }`}
        />
        <h2 className={`text-center capitalize mt-4 ${
          isSelected ? 'text-2xl font-bold' : 'text-lg font-semibold'
        }`}>
          {pokemon.name}
        </h2>
        <div className="flex justify-center gap-2 mt-4">
          {pokemon.types.map((type) => (
            <span 
              key={type.type.name}
              className={`px-3 py-1 rounded-full bg-gray-100 ${
                isSelected ? 'text-lg' : 'text-sm'
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      {isSelected && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60"
          onClick={(e) => {
            e.stopPropagation();
            setIsSelected(false);
          }}
        />
      )}
    </div>
  );
}