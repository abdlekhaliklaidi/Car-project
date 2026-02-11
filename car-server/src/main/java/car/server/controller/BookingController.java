package car.server.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @PostMapping
    public Map<String, String> createBooking(@RequestBody Map<String, Object> request) {

        return Map.of(
            "status", "success",
            "message", "Booking created successfully (DEV MODE)"
        );
    }

    @GetMapping
    public List<Map<String, String>> getAllBookings() {

        return List.of(
            Map.of("id", "1", "car", "Mercedes GLS", "status", "CONFIRMED"),
            Map.of("id", "2", "car", "BMW X5", "status", "PENDING")
        );
    }
}
