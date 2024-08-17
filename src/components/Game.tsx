// src/components/Game.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';
import { Drone } from './Drone';
import { Cave } from './Cave';
import { GameStatus } from './collision/GameStatus';
import { Score } from './Score';

const Game: React.FC = () => {
	const playerId = useStore((state) => state.playerId);
	const token = useStore((state) => state.token);
	const setCaveData = useStore((state) => state.setCaveData);
	const gameStatus = useStore((state) => state.gameStatus);
	const setGameStatus = useStore((state) => state.setGameStatus);
	const score = useStore((state) => state.score);
	const setScore = useStore((state) => state.setScore);

	const wsRef = useRef<WebSocket | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(true);

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
				setIsLoading(false);
				console.log('WebSocket connection closed');
			};
			return () => {
				wsRef.current?.close();
			};
		}
	}, [gameStatus, playerId, token]);

	return (
		<div>
			{isLoading ? null : (
				<svg
					width='500'
					height='500'
					style={{ backgroundColor: 'white', border: '1px solid black' }}
				>
					<Drone />
					<Cave />
					<GameStatus />
				</svg>
			)}

			<div>
				<Score />
			</div>
		</div>
	);
};

export default Game;
