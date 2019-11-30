import RaceData from '../types/RaceData';

export async function getRace(id: string): Promise<RaceData> {
  return {
    game: {
      name: 'F1 2019',
    },
    track: {
      id: 1,
      name: 'Melbourne Grand Prix Circuit',
    },
    startTime: new Date(),
    results: [
      {
        driver: { id: 1, isAi: false, name: 'FINDarkside' },
        position: 1,
        points: 25,
        laps: [
          { invalid: false, sector1: 25, sector2: 22, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 22, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 22, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 22, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 22, sector3: 23 },
        ],
      },
      {
        driver: { id: 2, isAi: false, name: 'Albert' },
        position: 1,
        points: 18,
        laps: [
          { invalid: false, sector1: 25, sector2: 22, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 26, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 26, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 26, sector3: 23 },
          { invalid: false, sector1: 20, sector2: 26, sector3: 23 },
        ],
      },
      {
        driver: { id: 3, isAi: true, name: 'Sevastian Vettel' },
        position: 3,
        points: 15,
        laps: [
          { invalid: false, sector1: 30, sector2: 30, sector3: 30 },
          { invalid: false, sector1: 30, sector2: 30, sector3: 30 },
          { invalid: false, sector1: 30, sector2: 30, sector3: 30 },
          { invalid: false, sector1: 30, sector2: 30, sector3: 30 },
          { invalid: false, sector1: 30, sector2: 30, sector3: 30 },
        ],
      },
    ],
  };
}
