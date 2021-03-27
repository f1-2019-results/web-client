import RaceData from '../types/RaceData';

export async function getRace(id: string): Promise<RaceData> {
  const res = await fetch('http://localhost:3000/race/6b5f880e-f769-4d69-bd2a-f50e7d91ab91');
  return res.json()
}
