package car.server.controller;

import car.server.Entity.Car;
import car.server.service.CarService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:4200")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public List<Car> getCars() {
        return carService.getAvailableCars();
    }

    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return carService.save(car);
    }
}
