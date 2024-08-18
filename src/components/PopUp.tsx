import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../store/store';

const lostMessage = 'The drone has been destroyed!';
const wonMessage = 'Congratulations!!!';

export const PopUp = () => {
	const { gameStatus, startNewGame, saveGameSession } = useStore(
		useShallow((store) => ({
			gameStatus: store.gameStatus,
			startNewGame: store.startNewGame,
			saveGameSession: store.saveGameSession,
		}))
	);

	const popUpMessage =
		gameStatus === 'lost' ? lostMessage : gameStatus === 'won' ? wonMessage : null;

	const handleOnClick = () => {
		saveGameSession();
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
