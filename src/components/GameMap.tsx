import React from 'react';
import { Drone } from './Drone';
import { Cave } from './Cave';
import { GameStatus } from './gameStatus/GameStatus';
import { Score } from './Score';
import { Speedometres } from './Speedometres/Speedometres';

export const GameMap = () => {
	return (
		<>
			<svg width='500' height='500' style={{ backgroundColor: 'white', border: '1px solid black' }}>
				<Drone />
				<Cave />
				<GameStatus />
			</svg>
			<div className='game-values'>
				<Score />
				<Speedometres />
			</div>
		</>
	);
};
