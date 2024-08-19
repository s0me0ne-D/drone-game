import { CaveSegment } from '../interfaces';
import { useStore } from '../store/store';

const CAVE_WIDTH = 500;
const CAVE_CENTER = 250;
const SEGMENT_HEIGHT = 10;
const CAVE_COLOR = 'grey';

export const Cave = () => {
	const caveData = useStore((state) => state.caveData);
	const dronePosition = useStore((state) => state.dronePosition);

	if (!caveData.length) return null;

	const renderPath = (startX: number, wallKey: keyof CaveSegment): string => {
		const pathSegments = caveData.map(
			(segment, index) => `L ${CAVE_CENTER + segment[wallKey]},${index * SEGMENT_HEIGHT}`
		);

		const lastSegmentY = caveData.length * SEGMENT_HEIGHT;

		return `
      M ${startX},0 
      ${pathSegments.join(' ')}
      L ${CAVE_CENTER + caveData[caveData.length - 1][wallKey]},${lastSegmentY}
      L ${startX},${lastSegmentY}
      Z`;
	};

	return (
		<g transform={`translate(0, ${-dronePosition.y})`}>
			<path d={renderPath(0, 'leftWall')} fill={CAVE_COLOR} />
			<path d={renderPath(CAVE_WIDTH, 'rightWall')} fill={CAVE_COLOR} />
		</g>
	);
};
