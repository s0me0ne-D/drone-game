import React, { useEffect, useState } from 'react';
import { WallsCoordinates } from './Collision';
import { useStore } from '../../store/store';

interface CheckColissionProps {
	droneWallsCoordinates: WallsCoordinates;
	caveWallsCoordinates: WallsCoordinates;
}

export const CheckColission = ({
	droneWallsCoordinates,
	caveWallsCoordinates,
}: CheckColissionProps) => {
	const dronePosition = useStore((store) => store.dronePosition);
	const setGameStatus = useStore((store) => store.setGameStatus);
	useEffect(() => {
		if (droneWallsCoordinates.leftWall.length > 15)
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
	}, [dronePosition]);

	return null;
};
