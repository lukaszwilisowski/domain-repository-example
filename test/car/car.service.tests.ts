import { describe, expect, it } from "@jest/globals";
import { MockedDBRepository } from "domain-repository";
import { Car, DbCar } from "../../src/domain/models/car.model";
import { CarService } from "../../src/domain/services/car.service";

describe("CarService", () => {
  const initialData: DbCar[] = [
    { id: "1", name: "Volvo", best: false, yearOfProduction: 2000 },
    {
      id: "2",
      name: "Toyota",
      best: true,
      yearOfProduction: 2010,
      sold: new Date(),
    },
  ];

  const mockedRepository = new MockedDBRepository<Car, DbCar>(initialData);
  const carService = new CarService(mockedRepository);

  it("should find best car", async () => {
    const car = await carService.findBestCar();

    expect(car).toBeDefined();
    expect(car!.name).toEqual("Toyota");
  });
});
