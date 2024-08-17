import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import { CheckColission } from './CheckCollision';

export interface WallsCoordinates {
	leftWall: WallCoordinates[];
	rightWall: WallCoordinates[];
}
export interface WallCoordinates {
	x: number;
	y: number;
}

const droneWidth = 15;

export const Collision = () => {
	const caveData = useStore((state) => state.caveData);

	const [droneWallsCoordinates, setDroneWallsCoordinates] = useState<WallsCoordinates>({
		leftWall: [],
		rightWall: [],
	});

	const [caveWallsCoordinates, setCaveWallsCoordinates] = useState<WallsCoordinates>({
		leftWall: [],
		rightWall: [],
	});

	useEffect(() => {
		for (let i = 1; i <= caveData.length; i++) {
			if (i === caveData.length) {
				setCaveWallsCoordinates((prev) => ({
					leftWall: [
						...prev.leftWall,
						{
							x: 250 + caveData[i - 1].leftWall,
							y: i * 10 - 10,
						},
					],
					rightWall: [
						...prev.rightWall,
						{
							x: 250 + caveData[i - 1].rightWall,
							y: i * 10 - 10,
						},
					],
				}));
				return;
			}
			const caveLeftStepStart = caveData[i - 1].leftWall;
			const caveLeftStepEnd = caveData[i].leftWall;
			const caveLeftStep = (caveLeftStepEnd - caveLeftStepStart) / 10;

			const caveRightStepStart = caveData[i - 1].rightWall;
			const caveRightStepEnd = caveData[i].rightWall;
			const caveRightStep = (caveRightStepEnd - caveRightStepStart) / 10;

			for (let k = 0; k < 10; k++) {
				setCaveWallsCoordinates((prev) => ({
					leftWall: [
						...prev.leftWall,
						{
							x: Number((250 + caveLeftStepStart + caveLeftStep * k).toFixed(1)),
							y: i * 10 + (k - 10),
						},
					],
					rightWall: [
						...prev.rightWall,
						{ x: 250 + caveRightStepStart + caveRightStep * k, y: i * 10 + (k - 10) },
					],
				}));
			}
		}
	}, []);
	useEffect(() => {
		setDroneWallsCoordinates({ leftWall: [], rightWall: [] });
		for (let i = 0; i <= droneWidth; i++) {
			const step = droneWidth / droneWidth / 2;
			setDroneWallsCoordinates((prev) => ({
				leftWall: [...prev.leftWall, { x: droneWidth / 2 - i * step, y: i }],
				rightWall: [...prev.rightWall, { x: droneWidth / 2 - i * step, y: i }],
			}));
		}
	}, []);

	if ((caveData.length, Math.ceil(caveWallsCoordinates.leftWall.length / 10))) {
		return (
			<CheckColission
				caveWallsCoordinates={caveWallsCoordinates}
				droneWallsCoordinates={droneWallsCoordinates}
			/>
		);
	} else return null;
};
