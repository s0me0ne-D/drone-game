import React, { useEffect } from 'react';
import { DronePosition } from '../interfaces/store_interfaces';
import { useStore } from '../store/store';

export const Drone = () => {
	const caveData = useStore((state) => state.caveData);
	const dronePosition = useStore((state) => state.dronePosition);
	const droneSpeed = useStore((state) => state.droneSpeed);

	const setDronePosition = useStore((state) => state.setDronePosition);

	useEffect(() => {
		const interval = setInterval(() => {
			const newPosition: DronePosition = {
				x: dronePosition.x + droneSpeed.x,
				y: dronePosition.y,
			};
			setDronePosition(newPosition);
		}, 100);

		return () => clearInterval(interval);
	}, [droneSpeed, caveData]);

	return (
		<polygon
			points={`${dronePosition.x - 10},${dronePosition.y} ${dronePosition.x + 10},${
				dronePosition.y
			} ${dronePosition.x},${dronePosition.y + 20}`}
			fill='blue'
		/>
	);
};
