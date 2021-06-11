export default interface RaceData {
  track: {
    id: number;
    name: string;
  };
  game: {
    name: string;
  };
  startTime: Date;
  results: Array<{
    driverId: string;
    driverName: string;
    teamName: string;
    isAi: boolean;
    dnf: boolean;
    startPosition: number;
    position: number;
    positionsGained: number;
    points: number;
    laps: Array<{
      sectors: Array<number>;
      position: number;
      invalid: boolean;
      lapnum: number;
      laptime: number;
    }>;
  }>;
}
