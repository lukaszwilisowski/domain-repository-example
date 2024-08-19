import { PostgreSQLDbRepository } from 'domain-repository/db/postgresql';
import { DataSource } from 'typeorm';
import { ICarSqlEntity } from './db/car.entity';
import { SqlCarEntity, sqlCarMapping } from './db/car.schema';
import { ICar, ICarAttached } from './domain/models/car.model';
import { CarService } from './domain/services/car.service';
import { IDomainRepository } from 'domain-repository';

const runPostgresTest = async (): Promise<void> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    database: 'mydb',
    username: 'postgres',
    password: 'admin',
    synchronize: true, //for local testing
    entities: [SqlCarEntity]
  });

  await dataSource.initialize();

  const carRepository: IDomainRepository<ICar, ICarAttached> = new PostgreSQLDbRepository<ICar, ICarAttached, ICarSqlEntity>(
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

runPostgresTest();
