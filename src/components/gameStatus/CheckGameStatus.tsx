import { useEffect } from 'react';
import { WallsCoordinates } from './GameStatus';
import { useStore } from '../../store/store';

interface CheckColissionProps {
	droneWallsCoordinates: WallsCoordinates;
	caveWallsCoordinates: WallsCoordinates;
}

const droneSize = 15;

export const CheckGameStatus = ({
	droneWallsCoordinates,
	caveWallsCoordinates,
}: CheckColissionProps) => {
	const dronePosition = useStore((store) => store.dronePosition);
	const setGameStatus = useStore((store) => store.setGameStatus);
	const saveGameSession = useStore((store) => store.saveGameSession);
	useEffect(() => {
		const checkCollision = () => {
			for (let i = 0; i <= droneSize; i++) {
				const indexOfWallSection = -dronePosition.y + i;
				const leftDroneCoordinates = dronePosition.x - droneWallsCoordinates.leftWall[i].x;
				const rightDroneCoordinates = dronePosition.x + droneWallsCoordinates.leftWall[i].x;
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
			console.log(-dronePosition.y, caveWallsCoordinates.leftWall.length);
			if (-dronePosition.y >= caveWallsCoordinates.leftWall.length) {
				setGameStatus('won');
				saveGameSession();
			}
		};

		checkCollision();
		checkIsWin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dronePosition]);
	return null;
};
