import { mapToMongoObjectId } from 'domain-repository/db/mongodb';
import { Mapping } from 'domain-repository/mapping';
import { Schema } from 'mongoose';
import { ICarAttached } from '../../domain/models/car.model';
import { ICarMongoEntity } from './car.entity';

export const CarSchema = new Schema<ICarMongoEntity>({
  name: {
    type: String,
    required: true
  },
  best_of_all: {
    type: Boolean,
    required: true
  },
  yearOfProduction: {
    type: Number,
    required: true
  },
  sold: {
    type: Date,
    required: false
  }
});

export const mongoCarMapping: Mapping<ICarAttached, ICarMongoEntity> = {
  id: mapToMongoObjectId,
  name: 'name',
  best: 'best_of_all',
  yearOfProduction: 'yearOfProduction',
  sold: 'sold'
};
