import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';
import { RotatingLines } from 'react-loader-spinner';
import { PopUp } from './PopUp';
import { useShallow } from 'zustand/react/shallow';
import { GameMap } from './GameMap';

export const Game = () => {
	const { playerId, token, setCaveData, gameStatus } = useStore(
		useShallow((store) => ({
			playerId: store.playerId,
			token: store.token,
			setCaveData: store.setCaveData,
			gameStatus: store.gameStatus,
		}))
	);

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
			};
			return () => {
				wsRef.current?.close();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameStatus, playerId, token]);

	return (
		<div className='game'>
			{isLoading ? (
				<RotatingLines
					strokeColor='grey'
					strokeWidth='5'
					animationDuration='0.75'
					width='96'
					visible={true}
				/>
			) : (
				<GameMap />
			)}
			{(gameStatus === 'lost' || gameStatus === 'won') && <PopUp />}
		</div>
	);
};
