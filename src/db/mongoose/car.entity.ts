import mongoose from 'mongoose';

export type ICarMongoEntity = {
  _id: mongoose.Types.ObjectId;
  name: string;
  best_of_all: boolean;
  readonly yearOfProduction: number;
  sold?: Date;
};
