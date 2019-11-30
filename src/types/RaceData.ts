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
    driver: {
      id: number;
      name: string;
      isAi: boolean;
    };
    position: number;
    points: number;
    laps: Array<{
      sector1: number;
      sector2: number;
      sector3: number;
      invalid: boolean;
    }>;
  }>;
}
