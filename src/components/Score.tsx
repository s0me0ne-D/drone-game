import React, { useEffect } from 'react';
import { useStore } from '../store/store';

export const Score = () => {
	const score = useStore((store) => store.score);
	const dronePositionY = useStore((store) => store.dronePosition.y);
	const complexity = useStore((store) => store.complexity);
	const setScore = useStore((store) => store.setScore);
	const droneSpeedY = useStore((store) => store.droneSpeed.y);

	useEffect(() => {
		if (dronePositionY !== 0) {
			setScore(complexity + -droneSpeedY);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dronePositionY]);

	return (
		<div className='score'>
			<h2>Score:</h2> <span>{score}</span>
		</div>
	);
};
