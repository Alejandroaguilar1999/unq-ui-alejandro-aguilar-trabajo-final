import { useEffect, useState } from 'react';
import Game from './app/Game';
import { getDifficulties } from './services/api';
import './index.css';

function App() {
  const [difficulties, setDifficulties] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    getDifficulties()
      .then(res => setDifficulties(res.data))
      .catch(() => alert('Error al cargar dificultades'));

    const data = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    setHistorial(data.reverse());
  }, []);

  return (
    <div className="layout">
      <div className="sidebar">
        <h3>Historial de juegos</h3>
        <ul>
          {historial.map((juego, index) => (
            <li key={index}>
              {juego.resultado === 'ganado' ? '🟢' : '🔴'} {juego.resultado} - {juego.dificultad} ({juego.letras} letras)
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <div className="game-wrapper">
          <h1>🎮 Wordle UNQ</h1>
          {!selectedId ? (
            <>
              <h2>Seleccioná una dificultad</h2>
              {difficulties.map(diff => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedId(diff.id)}
                  className="difficulty-button"
                >
                  {diff.name}
                </button>
              ))}
            </>
          ) : (
            <Game difficultyId={selectedId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
