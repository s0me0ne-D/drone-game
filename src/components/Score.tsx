import React, { useEffect } from 'react';
import { useStore } from '../store/store';

export const Score = () => {
	const score = useStore((store) => store.score);
	const dronePositionY = useStore((store) => store.dronePosition.y);
	const complexity = useStore((store) => store.complexity);
	const setScore = useStore((store) => store.setScore);

	useEffect(() => {
		if (dronePositionY % 50 === 0 && dronePositionY !== 0) {
			setScore(complexity);
		}
	}, [dronePositionY]);

	return (
		<div>
			<h2>Score:</h2> {score}
		</div>
	);
};
