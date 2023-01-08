import { mapToSqlIntId } from 'domain-repository/db/postgresql';
import { Mapping } from 'domain-repository/mapping';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICarAttached } from '../../domain/models/car.model';
import { ICarSqlEntity } from './car.entity';

//you can put ! next to the properties, to prevent Typescript no-initializer warnings
@Entity('cars')
export class SqlCarEntity implements ICarSqlEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column('text')
  name!: string;

  @Column('bool')
  best_of_all!: boolean;

  @Column('int')
  readonly yearOfProduction!: number;

  @Column('text', { nullable: true })
  sold?: Date;
}

export const sqlCarMapping: Mapping<ICarAttached, ICarSqlEntity> = {
  id: mapToSqlIntId,
  name: 'name',
  best: 'best_of_all',
  yearOfProduction: 'yearOfProduction',
  sold: 'sold'
};
