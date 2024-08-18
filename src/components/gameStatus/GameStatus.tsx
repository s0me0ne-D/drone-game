import { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import { CheckGameStatus } from './CheckGameStatus';
import { WallCoordinates, WallsCoordinates } from '../../interfaces';
import { DRONE_SIZE } from '../Drone';

const MAP_MIDDLE = 250;
const CAVE_SECTION_HEIGHT = 10;

export const GameStatus = () => {
	const caveData = useStore((state) => state.caveData);
	const [droneWallsCoordinates, setDroneWallsCoordinates] = useState<WallCoordinates[]>([]);
	const [caveWallsCoordinates, setCaveWallsCoordinates] = useState<WallsCoordinates>({
		leftWall: [],
		rightWall: [],
	});

	const setCaveCoordinates = () => {
		for (let i = 1; i <= caveData.length; i++) {
			if (i === caveData.length) {
				const addLastSectionCoordinates = (prev: WallsCoordinates) => ({
					leftWall: [
						...prev.leftWall,
						{
							x: MAP_MIDDLE + caveData[i - 1].leftWall,
							y: i * CAVE_SECTION_HEIGHT - CAVE_SECTION_HEIGHT,
						},
					],
					rightWall: [
						...prev.rightWall,
						{
							x: MAP_MIDDLE + caveData[i - 1].rightWall,
							y: i * CAVE_SECTION_HEIGHT - CAVE_SECTION_HEIGHT,
						},
					],
				});

				setCaveWallsCoordinates((prev) => addLastSectionCoordinates(prev));
				return;
			}
			const caveLeftStepStart = caveData[i - 1].leftWall;
			const caveLeftStepEnd = caveData[i].leftWall;
			const caveLeftStep = (caveLeftStepEnd - caveLeftStepStart) / CAVE_SECTION_HEIGHT;

			const caveRightStepStart = caveData[i - 1].rightWall;
			const caveRightStepEnd = caveData[i].rightWall;
			const caveRightStep = (caveRightStepEnd - caveRightStepStart) / CAVE_SECTION_HEIGHT;

			for (let k = 0; k < 10; k++) {
				const addSectionCoordinates = (prev: WallsCoordinates) => {
					const leftWallCoordinateX = Number(
						(MAP_MIDDLE + caveLeftStepStart + caveLeftStep * k).toFixed(1)
					);
					const rightWallCoordinateX = MAP_MIDDLE + caveRightStepStart + caveRightStep * k;

					const wallCoordinateY = i * CAVE_SECTION_HEIGHT + (k - CAVE_SECTION_HEIGHT);

					return {
						leftWall: [
							...prev.leftWall,
							{
								x: leftWallCoordinateX,
								y: wallCoordinateY,
							},
						],
						rightWall: [...prev.rightWall, { x: rightWallCoordinateX, y: wallCoordinateY }],
					};
				};

				setCaveWallsCoordinates((prev) => addSectionCoordinates(prev));
			}
		}
	};
	const setDroneCoordinates = () => {
		for (let i = 0; i <= DRONE_SIZE; i++) {
			const step = DRONE_SIZE / DRONE_SIZE / 2;
			setDroneWallsCoordinates((prev) => [...prev, { x: DRONE_SIZE / 2 - i * step, y: i }]);
		}
	};

	useEffect(() => {
		setCaveCoordinates();
		setDroneCoordinates();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if ((caveData.length, Math.ceil(caveWallsCoordinates.leftWall.length / CAVE_SECTION_HEIGHT))) {
		return (
			<CheckGameStatus
				caveWallsCoordinates={caveWallsCoordinates}
				droneWallsCoordinates={droneWallsCoordinates}
			/>
		);
	} else return null;
};
