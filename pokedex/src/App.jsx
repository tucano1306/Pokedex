import { Routes, Route, Navigate } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonDetail from './pages/PokemonDetail'; 


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
        {}
        <Route path="/" element={<Home />} />
        
        {}
        <Route 
          path="/pokedex" 
          element={
            <ProtectedRoute>
              <Pokedex />
            </ProtectedRoute>
          } 
        />

        {}
        <Route 
          path="/pokedex/:id" 
          element={
            <ProtectedRoute>
              <PokemonDetail />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PokemonProvider>
  );
}