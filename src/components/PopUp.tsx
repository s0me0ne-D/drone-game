import React from 'react';
import { useStore } from '../store/store';

const lostMessage = 'The drone has been destroyed!';
const wonMessage = 'Congratulations!!!';

export const PopUp = () => {
	const gameStatus = useStore((store) => store.gameStatus);
	const startNewGame = useStore((store) => store.startNewGame);
	const saveGameSession = useStore((store) => store.saveGameSession);

	const popUpMessage =
		gameStatus === 'lost' ? lostMessage : gameStatus === 'won' ? wonMessage : null;

	const handleOnClick = () => {
		gameStatus === 'won' && saveGameSession();
		startNewGame();
	};

	return (
		<div className='popUp'>
			<div className='container'>
				<h2>{popUpMessage}</h2>
				<button className='button' onClick={handleOnClick}>
					Back to start
				</button>
			</div>
		</div>
	);
};
