package com.carrental.controller;

import com.carrental.dto.AgencyDTO;
import com.carrental.service.AgencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agencies")
@CrossOrigin(origins = "http://localhost:4200")
public class AgencyController {
    
    @Autowired
    private AgencyService agencyService;
    
    @GetMapping
    public ResponseEntity<List<AgencyDTO>> getAllAgencies() {
        return ResponseEntity.ok(agencyService.getAllActiveAgencies());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<AgencyDTO>> searchAgencies(@RequestParam String query) {
        return ResponseEntity.ok(agencyService.searchAgencies(query));
    }
    
    @GetMapping("/airports")
    public ResponseEntity<List<AgencyDTO>> getAirportAgencies() {
        return ResponseEntity.ok(agencyService.getAirportAgencies());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AgencyDTO> getAgencyById(@PathVariable Long id) {
        return ResponseEntity.ok(agencyService.getAgencyById(id));
    }
}
