import ReactSpeedometer from 'react-d3-speedometer';
import { useStore } from '../../store/store';

export const HorizontalSpeedometr = () => {
	const droneSpeedX = useStore((store) => store.droneSpeed.x);

	return (
		<div>
			<h2>Horizontal</h2>
			<ReactSpeedometer height={130} width={200} maxValue={10} minValue={-10} value={droneSpeedX} />
		</div>
	);
};
