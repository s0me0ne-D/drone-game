import axios from 'axios';

const BASE_URL = 'https://cave-drone-server.shtoa.xyz';

export const initGame = async (name: string, complexity: number): Promise<string> => {
	const response = await axios.post(`${BASE_URL}/init`, { name, complexity });
	return response.data.id;
};

export const fetchTokenChunk = async (id: string, chunkNo: number): Promise<string> => {
	const response = await axios.get(`${BASE_URL}/token/${chunkNo}`, {
		params: { id },
	});
	return response.data.chunk;
};

export const fetchToken = async (id: string): Promise<string> => {
	const quantityOfChunks: number[] = [1, 2, 3, 4];
	const chunkPromises = quantityOfChunks.map((chunkNo) => fetchTokenChunk(id, chunkNo));
	const chunks = await Promise.all(chunkPromises);
	return chunks.join('');
};
