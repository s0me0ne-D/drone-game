import { useEffect } from 'react';
import { useStore } from '../store/store';

export const Cave = () => {
	const caveData = useStore((state) => state.caveData);
	const dronePosition = useStore((state) => state.dronePosition);

	if (caveData.length > 0) {
		return (
			<g transform={`translate(0, ${dronePosition.y})`}>
				<path
					d={`M 0,0 
${caveData.map((segment, index) => `L ${250 + segment.leftWall},${index * 10}`).join(' ')}
L ${250 + caveData[caveData.length - 1].leftWall},${caveData.length * 10} 
L 0,${caveData.length * 10} Z`}
					fill='grey'
				/>
				<path
					d={`M 500,0 
${caveData.map((segment, index) => `L ${250 + segment.rightWall},${index * 10}`).join(' ')}
L ${250 + caveData[caveData.length - 1].rightWall},${caveData.length * 10}
L 500,${caveData.length * 10} Z`}
					fill='grey'
				/>
			</g>
		);
	}
	return null;
};
