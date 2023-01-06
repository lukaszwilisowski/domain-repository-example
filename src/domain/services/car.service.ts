import { IDomainRepository } from 'domain-repository';
import { ICar, ICarAttached } from '../models/car.model';

export class CarService {
  constructor(private readonly carRepository: IDomainRepository<ICar, ICarAttached>) {}

  public async create(car: ICar): Promise<ICarAttached> {
    return this.carRepository.create(car);
  }

  public async findBestCar(): Promise<ICarAttached | undefined> {
    return this.carRepository.findOne({ best: true });
  }
}
