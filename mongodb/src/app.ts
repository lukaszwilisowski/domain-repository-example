import { MongoDbRepository } from 'domain-repository/db/mongodb';
import mongoose from 'mongoose';
import { ICarMongoEntity } from './db/car.entity';
import { CarSchema, mongoCarMapping } from './db/car.schema';
import { ICar, ICarAttached } from './domain/models/car.model';
import { CarService } from './domain/services/car.service';

const runMongoTest = async (): Promise<void> => {
  await new Promise<void>((resolve) => {
    mongoose.connect('mongodb://localhost:27017/testdb', {});
    mongoose.connection.on('open', () => resolve());
  });

  const carRepository = new MongoDbRepository<ICar, ICarAttached, ICarMongoEntity>(
    mongoose.model<ICarMongoEntity>('cars', CarSchema),
    mongoCarMapping
  );

  const carService = new CarService(carRepository);

  await carService.create({
    name: 'Toyota',
    best: true,
    yearOfProduction: 2010,
    sold: new Date()
  });

  const bestCar = await carService.findBestCar();
  console.log(bestCar);
};

runMongoTest();
