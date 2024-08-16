// src/components/Game.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';
import { CaveSegment } from '../interfaces/store_interfaces';
import { Drone } from './Drone';
import { Cave } from './Cave';

const Game: React.FC = () => {
	const playerId = useStore((state) => state.playerId);
	const token = useStore((state) => state.token);
	const setCaveData = useStore((state) => state.setCaveData);
	const setDroneSpeed = useStore((state) => state.setDroneSpeed);
	const gameStatus = useStore((state) => state.gameStatus);
	const setGameStatus = useStore((state) => state.setGameStatus);
	const score = useStore((state) => state.score);
	const setScore = useStore((state) => state.setScore);

	const wsRef = useRef<WebSocket | null>(null);

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
	}, [gameStatus, playerId, token]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowLeft') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, x: prevSpeed.x - 1 }));
			} else if (e.key === 'ArrowRight') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, x: prevSpeed.x + 1 }));
			} else if (e.key === 'ArrowUp') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, y: prevSpeed.y + 1 }));
			} else if (e.key === 'ArrowDown') {
				setDroneSpeed((prevSpeed) => ({ ...prevSpeed, y: prevSpeed.y - 1 }));
			}
		};

		window.addEventListener('keyup', handleKeyDown);

		return () => {
			window.removeEventListener('keyup', handleKeyDown);
		};
	}, []);

	return (
		<div>
			<svg width='500' height='500' style={{ backgroundColor: 'white', border: '1px solid black' }}>
				<Drone />
				<Cave />
			</svg>

			<div>
				<h2>Score: {score}</h2>
			</div>
		</div>
	);
};

export default Game;
