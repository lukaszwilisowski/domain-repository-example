import { Mapping, mapToSqlIntId } from 'domain-repository';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICarAttached } from '../../../domain/models/car.model';
import { ICarSqlEntity } from './car.entity';

//if you do not put ! next to the properties, TS will scream that properties are not initialized
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
