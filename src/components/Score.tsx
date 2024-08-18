import { useEffect } from 'react';
import { useStore } from '../store/store';
import { useShallow } from 'zustand/react/shallow';

export const Score = () => {
	const { score, dronePositionY, complexity, setScore, droneSpeedY } = useStore(
		useShallow((store) => ({
			score: store.score,
			dronePositionY: store.dronePosition.y,
			complexity: store.complexity,
			setScore: store.setScore,
			droneSpeedY: store.droneSpeed.y,
		}))
	);

	useEffect(() => {
		if (dronePositionY !== 0) setScore(complexity + -droneSpeedY);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dronePositionY]);

	return (
		<div className='score'>
			<h2>Score:</h2> <span>{score}</span>
		</div>
	);
};
