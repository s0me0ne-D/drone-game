import { useEffect } from 'react';
import { WallCoordinates, WallsCoordinates } from '../../interfaces/index';
import { useStore } from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import { DRONE_SIZE } from '../Drone';

interface CheckColissionProps {
	droneWallsCoordinates: WallCoordinates[];
	caveWallsCoordinates: WallsCoordinates;
}

export const CheckGameStatus = ({
	droneWallsCoordinates,
	caveWallsCoordinates,
}: CheckColissionProps) => {
	const { dronePosition, setGameStatus } = useStore(
		useShallow((store) => ({
			dronePosition: store.dronePosition,
			setGameStatus: store.setGameStatus,
		}))
	);

	const checkCollision = () => {
		for (let i = 0; i <= DRONE_SIZE; i++) {
			const indexOfWallSection = dronePosition.y + i;
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
		if (dronePosition.y >= 20) {
			setGameStatus('won');
		}
	};

	useEffect(() => {
		checkCollision();
		checkIsWin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dronePosition]);
	return null;
};
