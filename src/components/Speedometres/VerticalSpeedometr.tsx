import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { useStore } from '../../store/store';

export const VerticalSpeedometr = () => {
	const droneSpeedY = useStore((store) => store.droneSpeed.y);
	return (
		<div>
			<h2>Vertical</h2>
			<ReactSpeedometer height={130} width={200} maxValue={10} value={-droneSpeedY} />
		</div>
	);
};
