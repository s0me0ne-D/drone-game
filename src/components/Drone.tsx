import React, { useEffect, useState } from 'react';
import { DronePosition } from '../interfaces/store_interfaces';
import { useStore } from '../store/store';

export const Drone = () => {
	const caveData = useStore((state) => state.caveData);
	const dronePosition = useStore((state) => state.dronePosition);
	const droneSpeed = useStore((state) => state.droneSpeed);
	const setDroneSpeed = useStore((state) => state.setDroneSpeed);

	const setDronePosition = useStore((state) => state.setDronePosition);
	console.log(droneSpeed.x);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const speedLimit = 10;
			if (e.key === 'ArrowLeft') {
				setDroneSpeed((prevSpeed) => {
					const newHorizontalSpeed = prevSpeed.x > -speedLimit ? prevSpeed.x - 1 : prevSpeed.x;
					return { ...prevSpeed, x: newHorizontalSpeed };
				});
			} else if (e.key === 'ArrowRight') {
				setDroneSpeed((prevSpeed) => {
					const newHorizontalSpeed = prevSpeed.x < speedLimit ? prevSpeed.x + 1 : prevSpeed.x;
					return { ...prevSpeed, x: newHorizontalSpeed };
				});
			} else if (e.key === 'ArrowUp') {
				setDroneSpeed((prevSpeed) => {
					const newVerticalSpeed = prevSpeed.y < 0 ? prevSpeed.y + 1 : 0;
					return { ...prevSpeed, y: newVerticalSpeed };
				});
			} else if (e.key === 'ArrowDown') {
				setDroneSpeed((prevSpeed) => {
					const newVerticalSpeed = prevSpeed.y > -speedLimit ? prevSpeed.y - 1 : prevSpeed.y;
					return { ...prevSpeed, y: newVerticalSpeed };
				});
			}
		};

		window.addEventListener('keyup', handleKeyDown);

		return () => {
			window.removeEventListener('keyup', handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (droneSpeed.x !== 0 || droneSpeed.y !== 0) {
			const interval = setInterval(() => {
				const newPosition: DronePosition = {
					x: dronePosition.x + droneSpeed.x,
					y: dronePosition.y + droneSpeed.y,
				};
				setDronePosition(newPosition);
			}, 100);
			return () => clearInterval(interval);
		}
	}, [droneSpeed, caveData, dronePosition]);
	return (
		<polygon
			points={`${dronePosition.x - 15 / 2},${0} ${dronePosition.x + 15 / 2},${0} ${
				dronePosition.x
			},${15}`}
			fill='blue'
		/>
	);
};
