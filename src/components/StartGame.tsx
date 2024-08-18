import React, { ChangeEvent, useState } from 'react';
import { useStore } from '../store/store';
import { fetchToken, initGame } from '../api/api';
import { Scoreboard } from './Scoreboard';
import { useShallow } from 'zustand/react/shallow';

export const StartGame = () => {
	const { setPlayerName, setComplexity, setPlayerId, setToken, setGameStatus } = useStore(
		useShallow((store) => ({
			setPlayerName: store.setPlayerName,
			setComplexity: store.setComplexity,
			setPlayerId: store.setPlayerId,
			setToken: store.setToken,
			setGameStatus: store.setGameStatus,
		}))
	);

	const [name, setName] = useState<string>('');
	const [complexity, setComplexityLevel] = useState<number>(0);

	const [isError, setIsError] = useState<boolean>(false);

	const handleOnSubmit = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
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

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.value.length !== 0 && setIsError(false);
		setName(event.target.value);
	};

	const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (+event.target.value < 0 || +event.target.value > 10) {
			return;
		} else {
			setComplexityLevel(+event.target.value);
		}
	};
	return (
		<div className='start-game'>
			<form onSubmit={handleOnSubmit}>
				<h1>Drone Game</h1>
				<div className='values'>
					<input
						className={`name ${isError ? 'error-value' : ''}`}
						type='text'
						placeholder='Enter your name'
						value={name}
						onChange={handleNameChange}
					/>
					<input
						className='level'
						type='number'
						min='0'
						max='10'
						placeholder='Difficulty Level'
						value={complexity}
						onChange={handleLevelChange}
					/>
				</div>
				<button className='button' onClick={handleOnSubmit} type='submit'>
					Start Game
				</button>
			</form>
			<Scoreboard />
		</div>
	);
};
