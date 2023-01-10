export type ICar = {
  /* Mutable name of the car. */
  name: string;

  /* Mutable flag. Equals true for the single, highest ranked car in the system. */
  best: boolean;

  /* Readonly year of production. */
  readonly yearOfProduction: number;

  /* Mutable sale date. Optional means the car was not sold yet. */
  sold?: Date;
};

export type ICarAttached = ICar & { id: string };
