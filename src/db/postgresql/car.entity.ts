export type ICarSqlEntity = {
  id: number;
  name: string;
  best_of_all: boolean;
  readonly yearOfProduction: number;
  sold?: Date;
};
