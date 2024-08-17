import React, { useState } from 'react';
import { useStore } from '../store/store';
import { fetchToken, initGame } from '../api/api';

export const StartGame = () => {
	const setPlayerName = useStore((state) => state.setPlayerName);
	const setComplexity = useStore((state) => state.setComplexity);
	const setPlayerId = useStore((state) => state.setPlayerId);
	const setToken = useStore((state) => state.setToken);
	const setGameStatus = useStore((state) => state.setGameStatus);

	const [name, setName] = useState<string>('');
	const [complexity, setComplexityLevel] = useState<number>(0);

	const [isError, setIsError] = useState<boolean>(false);

	const handleStartGame = async () => {
		if (name.length === 0) {
			setIsError(true);
		} else {
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
		}
	};

	return (
		<div className='start-game'>
			<h1>Drone Game</h1>
			<div>
				<input
					className={`name ${isError ? 'error-value' : ''}`}
					type='text'
					placeholder='Enter your name'
					value={name}
					onChange={(e) => {
						e.target.value.length !== 0 && setIsError(false);
						setName(e.target.value);
					}}
				/>
				<input
					className='level'
					type='number'
					min='0'
					max='10'
					placeholder='Difficulty Level'
					value={complexity}
					onChange={(e) => {
						if (+e.target.value < 0 || +e.target.value > 10) {
							return;
						} else {
							setComplexityLevel(+e.target.value);
						}
					}}
				/>
			</div>
			<button className='start-button' onClick={handleStartGame}>
				Start Game
			</button>
		</div>
	);
};
