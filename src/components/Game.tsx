// src/components/Game.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';
import { CaveSegment, DronePosition, DroneSpeed } from '../interfaces/store_interfaces';
import { Drone } from './Drone';

const Game: React.FC = () => {
	const playerId = useStore((state) => state.playerId);
	const token = useStore((state) => state.token);
	const caveData = useStore((state) => state.caveData);
	const setCaveData = useStore((state) => state.setCaveData);
	// const dronePosition = useStore((state) => state.dronePosition);
	const setDronePosition = useStore((state) => state.setDronePosition);
	// const droneSpeed = useStore((state) => state.droneSpeed);
	const setDroneSpeed = useStore((state) => state.setDroneSpeed);
	const gameStatus = useStore((state) => state.gameStatus);
	const setGameStatus = useStore((state) => state.setGameStatus);
	const score = useStore((state) => state.score);
	const setScore = useStore((state) => state.setScore);

	const wsRef = useRef<WebSocket | null>(null);

	const calculateDroneStartPosition = (caveData: CaveSegment[]) => {
		const middleX = 250 + (caveData[0].leftWall + caveData[0].rightWall) / 2;
		setDronePosition({ x: middleX, y: 0 });
	};

	useEffect(() => {
		if (gameStatus === 'playing' && playerId && token) {
			wsRef.current = new WebSocket(`wss://cave-drone-server.shtoa.xyz/cave`);
			wsRef.current.onopen = () => {
				wsRef.current?.send(`player:${playerId}-${token}`);
			};

			wsRef.current.onmessage = (event) => {
				const [leftWall, rightWall] = event.data.split(',').map(Number);

				if (leftWall && rightWall) {
					setCaveData({ leftWall, rightWall });
				}
			};

			wsRef.current.onclose = () => {
				console.log('WebSocket connection closed');
			};
			return () => {
				wsRef.current?.close();
			};
		}
	}, [gameStatus, playerId, setCaveData, token]);

	useEffect(() => {
		caveData.length > 0 && calculateDroneStartPosition(caveData);
	}, [caveData]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, x: prevSpeed.x - 1 }));
			} else if (e.key === 'ArrowRight') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, x: prevSpeed.x + 1 }));
			} else if (e.key === 'ArrowUp') {
				// setDroneSpeed((prevSpeed) => ({ ...prevSpeed, y: prevSpeed.y - 1 }));
			} else if (e.key === 'ArrowDown') {
				// setDroneSpeed((prevSpeed) => ({ ...prevSpeed, y: prevSpeed.y + 1 }));
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setDroneSpeed]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		const newPosition: DronePosition = {
	// 			x: dronePosition.x + droneSpeed.x,
	// 			y: dronePosition.y,
	// 		};
	// 		setDronePosition(newPosition);
	// 	}, 100);

	// 	return () => clearInterval(interval);
	// }, [droneSpeed, caveData]);

	return (
		<div>
			<svg width='500' height='500' style={{ backgroundColor: 'white', border: '1px solid black' }}>
				{/* <polygon
					points={`${dronePosition.x - 10},${dronePosition.y} ${dronePosition.x + 10},${
						dronePosition.y
					} ${dronePosition.x},${dronePosition.y + 20}`}
					fill='blue'
				/> */}
				<Drone />
				{caveData.length > 0 && (
					<>
						<path
							d={`M 0,0 
                    ${caveData
											.map((segment, index) => `L ${250 + segment.leftWall},${index * 10}`)
											.join(' ')}
                    L ${250 + caveData[caveData.length - 1].leftWall},${caveData.length * 10} 
                    L 0,${caveData.length * 10} Z`}
							fill='grey'
						/>
						<path
							d={`M 500,0 
                    ${caveData
											.map((segment, index) => `L ${250 + segment.rightWall},${index * 10}`)
											.join(' ')}
                    L ${250 + caveData[caveData.length - 1].rightWall},${caveData.length * 10}
                    L 500,${caveData.length * 10} Z`}
							fill='grey'
						/>
					</>
				)}
			</svg>

			<div>
				<h2>Score: {score}</h2>
			</div>
		</div>
	);
};

export default Game;
