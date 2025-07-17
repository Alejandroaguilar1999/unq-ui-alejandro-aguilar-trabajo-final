import { useEffect, useState, useCallback } from 'react';
import { getSession, checkWord } from '../services/api';
import Keyboard from '../components/Keyboard';

function Game({ difficultyId }) {
  const [session, setSession] = useState(null);
  const [word, setWord] = useState('');
  const [rows, setRows] = useState([]);
  const [usedLetters, setUsedLetters] = useState({});
  const [estadoJuego, setEstadoJuego] = useState({ terminado: false, ganado: false });

  useEffect(() => {
    getSession(difficultyId)
      .then(res => setSession(res.data))
      .catch(() => alert('Error al iniciar juego'));
  }, [difficultyId]);

  useEffect(() => {
    const listener = (e) => {
      if (estadoJuego.terminado) return;
      if (e.key === 'Enter') handleSubmit();
      else if (e.key === 'Backspace') setWord(prev => prev.slice(0, -1));
      else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
        if (word.length < session.wordLenght) {
          setWord(prev => prev + e.key.toLowerCase());
        }
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [word, estadoJuego, session]);

  const guardarPartida = useCallback((resultado) => {
    const partida = {
      resultado,
      dificultad: session.difficulty.name,
      letras: session.wordLenght,
      fecha: new Date().toISOString()
    };

    const historial = JSON.parse(localStorage.getItem('historialPartidas')) || [];
    historial.push(partida);
    localStorage.setItem('historialPartidas', JSON.stringify(historial));
  }, [session]);

  const handleSubmit = async () => {
    if (!word || word.length !== session.wordLenght) return;

    try {
      const res = await checkWord({ sessionId: session.sessionId, word });
      setRows(prev => [...prev, res.data]);
      setWord('');

      res.data.forEach(({ letter, solution }) => {
        setUsedLetters(prev => {
          const current = prev[letter];
          if (current === 'correct') return prev;
          if (current === 'elsewhere' && solution === 'absent') return prev;
          return { ...prev, [letter]: solution };
        });
      });

      const isWin = res.data.every(l => l.solution === 'correct');
      const isLast = rows.length + 1 >= 6;

      if (isWin) {
        setEstadoJuego({ terminado: true, ganado: true });
        guardarPartida('ganado');
      } else if (isLast) {
        setEstadoJuego({ terminado: true, ganado: false });
        guardarPartida('perdido');
      }

    } catch (e) {
      alert('Palabra inválida');
    }
  };

  const renderGameUI = () => (
    <>
      <h3>Intentos: {rows.length} / 6</h3>

      {rows.map((row, i) => (
        <div key={i} className="letter-row">
          {row.map((l, idx) => (
            <div key={idx} className={`letter-box ${l.solution}`}>
              {l.letter}
            </div>
          ))}
        </div>
      ))}

      {!estadoJuego.terminado && (
        <div className="letter-row">
          {Array.from({ length: session.wordLenght }).map((_, i) => (
            <div key={i} className="letter-box empty">
              {word[i] || ''}
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-button">Enviar</button>
        </div>
      )}

      <Keyboard
        onKeyClick={(l) => {
          if (!estadoJuego.terminado && word.length < session.wordLenght) {
            setWord(prev => prev + l);
          }
        }}
        usedLetters={usedLetters}
      />

      {estadoJuego.terminado && (
        <>
          <h2 className={estadoJuego.ganado ? 'text-win' : 'text-lose'}>
            {estadoJuego.ganado ? '¡Ganaste! 🎉' : 'Perdiste 😢'}
          </h2>
          <button onClick={() => window.location.reload()} className="submit-button">
            Jugar otra vez
          </button>
        </>
      )}
    </>
  );

  if (!session) return <p>Cargando juego...</p>;

  return (
    <div>
      {renderGameUI()}
    </div>
  );
}

export default Game;
