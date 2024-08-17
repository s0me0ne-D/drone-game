import React, { useEffect } from 'react';
import { useStore } from '../store/store';

export const Score = () => {
	const score = useStore((store) => store.score);
	const dronePositionY = useStore((store) => store.dronePosition.y);
	const complexity = useStore((store) => store.complexity);
	const setScore = useStore((store) => store.setScore);

	useEffect(() => {
		const scoreMultiplier = 20 - complexity;
		if (dronePositionY % scoreMultiplier === 0 && dronePositionY !== 0) {
			setScore(1);
		}
	}, [dronePositionY]);

	return (
		<div className='score'>
			<h2>Score:</h2> <span>{score}</span>
		</div>
	);
};
