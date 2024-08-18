import ReactSpeedometer from 'react-d3-speedometer';
import { useStore } from '../../store/store';
import { MAX_SPEED_LIMIT } from '../Drone';

export const HorizontalSpeedometr = () => {
	const droneSpeedX = useStore((store) => store.droneSpeed.x);

	return (
		<div>
			<h2>Horizontal</h2>
			<ReactSpeedometer
				height={130}
				width={200}
				maxValue={MAX_SPEED_LIMIT}
				minValue={-MAX_SPEED_LIMIT}
				value={droneSpeedX}
			/>
		</div>
	);
};
