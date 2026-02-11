package car.server.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        if ("admin@car.com".equals(email) && "1234".equals(password)) {
            return Map.of(
                "status", "success",
                "message", "Login successful"
            );
        }

        return Map.of(
            "status", "error",
            "message", "Invalid credentials"
        );
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> request) {

        return Map.of(
            "status", "success",
            "message", "User registered successfully (DEV MODE)"
        );
    }
}
