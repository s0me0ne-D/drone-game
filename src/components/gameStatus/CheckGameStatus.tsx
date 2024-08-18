import { useEffect } from 'react';
import { WallCoordinates, WallsCoordinates } from './GameStatus';
import { useStore } from '../../store/store';

interface CheckColissionProps {
	droneWallsCoordinates: WallCoordinates[];
	caveWallsCoordinates: WallsCoordinates;
}

const droneSize = 10;

export const CheckGameStatus = ({
	droneWallsCoordinates,
	caveWallsCoordinates,
}: CheckColissionProps) => {
	const dronePosition = useStore((store) => store.dronePosition);
	const setGameStatus = useStore((store) => store.setGameStatus);

	useEffect(() => {
		const checkCollision = () => {
			for (let i = 0; i <= droneSize; i++) {
				const indexOfWallSection = -dronePosition.y + i;
				const leftDroneCoordinates = dronePosition.x - droneWallsCoordinates[i].x;
				const rightDroneCoordinates = dronePosition.x + droneWallsCoordinates[i].x;
				if (caveWallsCoordinates.leftWall[indexOfWallSection]) {
					if (
						leftDroneCoordinates <= caveWallsCoordinates.leftWall[indexOfWallSection].x ||
						caveWallsCoordinates.rightWall[indexOfWallSection].x <= rightDroneCoordinates
					) {
						setGameStatus('lost');
					}
				}
			}
		};

		const checkIsWin = () => {
			if (-dronePosition.y >= caveWallsCoordinates.leftWall.length) {
				setGameStatus('won');
			}
		};

		checkCollision();
		checkIsWin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dronePosition]);
	return null;
};
