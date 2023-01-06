export type Car = {
  name: string;
  best: boolean;
  readonly yearOfProduction: number;
  sold?: Date;
}

export type DbCar = Car & { id: string };