import React, { useEffect, useState } from 'react';
import { DronePosition } from '../interfaces/store_interfaces';
import { useStore } from '../store/store';

export const Drone = () => {
	const caveData = useStore((state) => state.caveData);
	const dronePosition = useStore((state) => state.dronePosition);
	const droneSpeed = useStore((state) => state.droneSpeed);

	const setDronePosition = useStore((state) => state.setDronePosition);

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
