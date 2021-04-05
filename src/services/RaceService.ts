import RaceData from '../types/RaceData';
import PartialRaceData from '../types/PartialRaceData';

const apiUrl = 'https://f1-results.herokuapp.com';

export async function getRace(id: string): Promise<RaceData> {
  const res = await fetch(apiUrl + '/race/' + id);
  return res.json();
}

export async function getAllRaces(): Promise<PartialRaceData[]> {
  const res = await fetch(apiUrl + '/race/');
  return res.json();
}
