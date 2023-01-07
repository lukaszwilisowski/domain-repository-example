import { MongoDbRepository } from 'domain-repository/db/mongodb';
import { PostgreSQLDbRepository } from 'domain-repository/db/postgresql';
import mongoose from 'mongoose';
import { DataSource } from 'typeorm';
import { ICarMongoEntity } from './db/mongoose/car.entity';
import { CarSchema, mongoCarMapping } from './db/mongoose/car.schema';
import { ICarSqlEntity } from './db/typeorm/car.entity';
import { SqlCarEntity, sqlCarMapping } from './db/typeorm/car.schema';
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

const runPostgresTest = async (): Promise<void> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'testdb',
    username: 'postgres',
    password: 'admin',
    synchronize: true, //for local testing
    entities: [SqlCarEntity]
  });

  await dataSource.initialize();

  const carRepository = new PostgreSQLDbRepository<ICar, ICarAttached, ICarSqlEntity>(
    dataSource.getRepository(SqlCarEntity),
    sqlCarMapping
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
runPostgresTest();
