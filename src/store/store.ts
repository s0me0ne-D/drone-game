import { create } from 'zustand';
import { CaveSegment, GameState } from '../interfaces/store_interfaces';

export const useStore = create<GameState>((set) => ({
	playerName: '',
	complexity: 0,
	playerId: '',
	token: '',
	caveData: [],
	dronePosition: { x: 0, y: 0 },
	droneSpeed: { x: 0, y: 0 },
	gameStatus: 'idle',
	score: 0,
	gameSessions: JSON.parse(localStorage.getItem('gameSessions') || '[]'),
	caveWallsCoordinates: { leftWall: [], rightWall: [] },

	setPlayerName: (name) => set({ playerName: name }),
	setComplexity: (level) => set({ complexity: level }),
	setPlayerId: (id) => set({ playerId: id }),
	setToken: (token) => set({ token: token }),
	setCaveData: (data) => {
		set((state) => {
			const newCaveData = [...state.caveData, data];
			const calculateDroneStartPosition = (caveData: CaveSegment[]) => {
				if (caveData.length === 1) {
					const middleX = 250 + (caveData[0].leftWall + caveData[0].rightWall) / 2;
					return { x: middleX, y: 0 };
				} else return state.dronePosition;
			};
			const startPosition = calculateDroneStartPosition(state.caveData);
			return { caveData: newCaveData, dronePosition: startPosition };
		});
	},
	setDronePosition: (position) => set({ dronePosition: position }),
	setDroneSpeed: (speed) =>
		set((state) => {
			const updatedSpeed = typeof speed === 'function' ? speed(state.droneSpeed) : speed;
			return { droneSpeed: updatedSpeed };
		}),
	setGameStatus: (status) => set({ gameStatus: status }),
	setScore: (score) => set((store) => ({ score: store.score + score })),
	addGameSession: (session) => {
		set((state) => {
			const updatedSessions = [...state.gameSessions, session];
			localStorage.setItem('gameSessions', JSON.stringify(updatedSessions));
			return { gameSessions: updatedSessions };
		});
	},
}));
