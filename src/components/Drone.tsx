import { useEffect } from 'react';
import { DronePosition } from '../interfaces';
import { useStore } from '../store/store';
import { useShallow } from 'zustand/react/shallow';

export const DRONE_SIZE = 10;
export const MAX_SPEED_LIMIT = 10;

export const Drone = () => {
	const { caveData, dronePosition, droneSpeed, gameStatus, setDroneSpeed, setDronePosition } =
		useStore(
			useShallow((store) => ({
				caveData: store.caveData,
				dronePosition: store.dronePosition,
				droneSpeed: store.droneSpeed,
				gameStatus: store.gameStatus,
				setDroneSpeed: store.setDroneSpeed,
				setDronePosition: store.setDronePosition,
			}))
		);

	useEffect(() => {
		if (gameStatus === 'playing') {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'ArrowLeft') {
					setDroneSpeed((prevSpeed) => {
						const newHorizontalSpeed =
							prevSpeed.x > -MAX_SPEED_LIMIT ? prevSpeed.x - 1 : prevSpeed.x;
						return { ...prevSpeed, x: newHorizontalSpeed };
					});
				} else if (e.key === 'ArrowRight') {
					setDroneSpeed((prevSpeed) => {
						const newHorizontalSpeed =
							prevSpeed.x < MAX_SPEED_LIMIT ? prevSpeed.x + 1 : prevSpeed.x;
						return { ...prevSpeed, x: newHorizontalSpeed };
					});
				} else if (e.key === 'ArrowUp') {
					setDroneSpeed((prevSpeed) => {
						const newVerticalSpeed = prevSpeed.y < 0 ? prevSpeed.y + 1 : 0;
						return { ...prevSpeed, y: newVerticalSpeed };
					});
				} else if (e.key === 'ArrowDown') {
					setDroneSpeed((prevSpeed) => {
						const newVerticalSpeed = prevSpeed.y > -MAX_SPEED_LIMIT ? prevSpeed.y - 1 : prevSpeed.y;
						return { ...prevSpeed, y: newVerticalSpeed };
					});
				}
			};

			window.addEventListener('keyup', handleKeyDown);

			return () => {
				window.removeEventListener('keyup', handleKeyDown);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (droneSpeed.x !== 0 || droneSpeed.y !== 0) {
			if (gameStatus !== 'playing') {
				setDroneSpeed({ x: 0, y: 0 });
			} else {
				const interval = setInterval(() => {
					const newPosition: DronePosition = {
						x: dronePosition.x + droneSpeed.x,
						y: dronePosition.y + droneSpeed.y,
					};
					setDronePosition(newPosition);
				}, 100);
				return () => clearInterval(interval);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [droneSpeed, caveData, dronePosition]);

	return (
		<polygon
			points={`${dronePosition.x - DRONE_SIZE / 2},${0} ${dronePosition.x + DRONE_SIZE / 2},${0} ${
				dronePosition.x
			},${DRONE_SIZE}`}
			fill='blue'
		/>
	);
};
