import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

  // Filtramos los movimientos aprendidos por nivel
  const levelUpMoves = pokemon.moves
    .filter(move => move.version_group_details.some(detail => 
      detail.move_learn_method.name === "level-up"
    ))
    .map(move => ({
      name: move.move.name,
      level: move.version_group_details.find(detail => 
        detail.move_learn_method.name === "level-up"
      ).level_learned_at
    }))
    .sort((a, b) => a.level - b.level);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate('/pokedex')}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Volver
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Información básica */}
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-48 h-48"
          />
          <h1 className="text-2xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <p className="text-gray-600">#{String(pokemon.id).padStart(3, '0')}</p>
        </div>

        {/* Características físicas */}
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-bold">Altura:</p>
              <p>{pokemon.height / 10} m</p>
            </div>
            <div>
              <p className="font-bold">Peso:</p>
              <p>{pokemon.weight / 10} kg</p>
            </div>
          </div>

          {/* Tipos */}
          <div className="mb-4">
            <p className="font-bold mb-2">Tipos:</p>
            <div className="flex gap-2">
              {pokemon.types.map(type => (
                <span 
                  key={type.type.name}
                  className="px-3 py-1 bg-gray-200 rounded-full capitalize"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Habilidades */}
          <div className="mb-4">
            <p className="font-bold mb-2">Habilidades:</p>
            <div className="flex gap-2">
              {pokemon.abilities.map(ability => (
                <span 
                  key={ability.ability.name}
                  className="px-3 py-1 bg-gray-200 rounded-full capitalize"
                >
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mb-6">
            <p className="font-bold mb-2">Estadísticas:</p>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="mb-2">
                <div className="flex justify-between">
                  <span className="capitalize">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Movimientos por nivel */}
          <div>
            <h2 className="font-bold text-xl mb-4">Movimientos por nivel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelUpMoves.map(move => (
                <div 
                  key={move.name}
                  className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                >
                  <span className="capitalize">{move.name.replace('-', ' ')}</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                    Nv. {move.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}