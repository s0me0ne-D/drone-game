import ReactSpeedometer from 'react-d3-speedometer';
import { useStore } from '../../store/store';
import { MAX_SPEED_LIMIT } from '../Drone';

export const VerticalSpeedometr = () => {
	const droneSpeedY = useStore((store) => store.droneSpeed.y);
	return (
		<div>
			<h2>Vertical</h2>
			<ReactSpeedometer height={130} width={200} maxValue={MAX_SPEED_LIMIT} value={droneSpeedY} />
		</div>
	);
};
