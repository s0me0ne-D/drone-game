export interface DronePosition {
	x: number;
	y: number;
}

export interface DroneSpeed {
	x: number;
	y: number;
}

export interface CaveSegment {
	leftWall: number;
	rightWall: number;
}

export interface GameSession {
	playerName: string;
	complexity: number;
	score: number;
}

export interface GameState {
	playerName: string;
	complexity: number;
	playerId: string;
	token: string;
	caveData: CaveSegment[];
	dronePosition: DronePosition;
	droneSpeed: DroneSpeed;
	gameStatus: 'idle' | 'playing' | 'won' | 'lost';
	score: number;
	gameSessions: GameSession[];

	setPlayerName: (name: string) => void;
	setComplexity: (level: number) => void;
	setPlayerId: (id: string) => void;
	setToken: (token: string) => void;
	setCaveData: (data: CaveSegment) => void;
	setDronePosition: (position: DronePosition) => void;
	setDroneSpeed: (speed: DroneSpeed | ((prevSpeed: DroneSpeed) => DroneSpeed)) => void;
	setGameStatus: (status: 'idle' | 'playing' | 'won' | 'lost') => void;
	setScore: (score: number) => void;
	saveGameSession: () => void;
	startNewGame: () => void;
}
