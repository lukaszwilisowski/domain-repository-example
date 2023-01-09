export type ICar = {
  name: string;
  best: boolean;
  readonly yearOfProduction: number;
  sold?: Date;
};

export type ICarAttached = ICar & { id: string };
