import './App.css';
import Game from './components/Game';
import StartGame from './components/StartGame';
import { useStore } from './store/store';

function App() {
	const gameStatus = useStore((state) => state.gameStatus);

	return (
		<div>
			{gameStatus === 'idle' && <StartGame />}
			{gameStatus === 'playing' && <Game />}
		</div>
	);
}

export default App;
