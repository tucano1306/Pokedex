import { useState } from 'react';
import { usePokemon } from './context';

const Home = () => {
  const [inputName, setInputName] = useState('');
  const { setTrainer } = usePokemon();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      setTrainer(inputName);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-wider">POKÉDEX</h1>
        </div>
        
        <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-red-600">
            ¡Hola entrenador!
          </h2>
          <p className="text-center text-gray-600">
            Para poder comenzar, dame tu nombre
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <input
                type="text"
                required
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Tu nombre..."
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Comenzar
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 border-8 border-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full border-4 border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;