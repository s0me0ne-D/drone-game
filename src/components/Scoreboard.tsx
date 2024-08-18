import React from 'react';
import { useStore } from '../store/store';

export const Scoreboard = () => {
	const gameSession = useStore((state) => state.gameSessions);
	return (
		<div className='scoreboard'>
			<div className='scoreboard-header row'>
				<div className='cell'>
					<h3>Name</h3>
				</div>
				<div className='cell'>
					<h3>Complexity</h3>
				</div>
				<div className='cell'>
					<h3>Score</h3>
				</div>
			</div>
			<ul className='scoreboard-results'>
				{gameSession.map((data, index) => (
					<li className='row' key={index}>
						<div className='cell'>{data.playerName}</div>
						<div className='cell'>{data.complexity}</div>
						<div className='cell'>{data.score}</div>
					</li>
				))}
			</ul>
		</div>
	);
};
