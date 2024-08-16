import React, { useState } from 'react';
import { useStore } from '../store/store';
import { fetchToken, initGame } from '../api/api';
const StartGame: React.FC = () => {
	const setPlayerName = useStore((state) => state.setPlayerName);
	const setComplexity = useStore((state) => state.setComplexity);
	const setPlayerId = useStore((state) => state.setPlayerId);
	const setToken = useStore((state) => state.setToken);
	const setGameStatus = useStore((state) => state.setGameStatus);

	const [name, setName] = useState<string>('');
	const [complexity, setComplexityLevel] = useState<number>(0);

	const handleStartGame = async () => {
		setPlayerName(name);
		setComplexity(complexity);

		try {
			const playerId = await initGame(name, complexity);
			setPlayerId(playerId);
			const token = await fetchToken(playerId);
			setToken(token);
			setGameStatus('playing');
		} catch (error) {
			console.error('Error starting the game:', error);
		}
	};

	return (
		<div>
			<h1>Cave Drone Game</h1>
			<input
				type='text'
				placeholder='Enter your name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='number'
				min='0'
				max='10'
				placeholder='Difficulty Level'
				value={complexity}
				onChange={(e) => setComplexityLevel(Number(e.target.value))}
			/>
			<button onClick={handleStartGame}>Start Game</button>
		</div>
	);
};

export default StartGame;
