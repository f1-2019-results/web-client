import RaceData from '../types/RaceData';
import PartialRaceData from '../types/PartialRaceData';

export async function getRace(id: string): Promise<RaceData> {
  const res = await fetch('http://localhost:3000/race/' + id);
  return res.json();
}

export async function getAllRaces(): Promise<PartialRaceData[]> {
  const res = await fetch('http://localhost:3000/race/');
  return res.json();
}
