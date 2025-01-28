import { Routes, Route, Navigate } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail'; // Asegúrate de crear este archivo

// Componente de Ruta Protegida
function ProtectedRoute({ children }) {
  const trainer = localStorage.getItem('trainerName');
  if (!trainer) {
    return <Navigate to="/" />;
  }
  return children;
}

export default function App() {
  return (
    <PokemonProvider>
      <Routes>
        {/* Ruta Home */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta Pokedex */}
        <Route 
          path="/pokedex" 
          element={
            <ProtectedRoute>
              <Pokedex />
            </ProtectedRoute>
          } 
        />

        {/* Ruta Detalle Pokémon */}
        <Route 
          path="/pokedex/:id" 
          element={
            <ProtectedRoute>
              <PokemonDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </PokemonProvider>
  );
}