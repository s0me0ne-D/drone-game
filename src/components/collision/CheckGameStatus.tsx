import React, { useEffect } from 'react';
import { WallsCoordinates } from './GameStatus';
import { useStore } from '../../store/store';

interface CheckColissionProps {
	droneWallsCoordinates: WallsCoordinates;
	caveWallsCoordinates: WallsCoordinates;
}

export const CheckGameStatus = ({
	droneWallsCoordinates,
	caveWallsCoordinates,
}: CheckColissionProps) => {
	const dronePosition = useStore((store) => store.dronePosition);
	const setGameStatus = useStore((store) => store.setGameStatus);
	useEffect(() => {
		const checkCollision = () => {
			for (let i = 0; i <= 15; i++) {
				const indexOfWallSection = -dronePosition.y + i;
				const leftDroneCoordinates = dronePosition.x - droneWallsCoordinates.leftWall[i].x;
				const rightDroneCoordinates = dronePosition.x + droneWallsCoordinates.leftWall[i].x;

				if (
					leftDroneCoordinates <= caveWallsCoordinates.leftWall[indexOfWallSection].x ||
					caveWallsCoordinates.rightWall[indexOfWallSection].x <= rightDroneCoordinates
				) {
					setGameStatus('lost');
				}
			}
		};

		const checkIsWin = () => {
			if (-dronePosition.y === caveWallsCoordinates.leftWall.length + 10) {
				setGameStatus('won');
			}
		};
		checkCollision();
		checkIsWin();
	}, [dronePosition]);
	return null;
};
