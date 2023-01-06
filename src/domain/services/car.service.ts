import { IReadDomainRepository } from "domain-repository";
import { DbCar } from "../models/car.model";

export class CarService {
  constructor(private readonly carRepository: IReadDomainRepository<DbCar>) {}

  public async findBestCar(): Promise<DbCar | undefined> {
    return this.carRepository.findOne({ best: true });
  }
}
