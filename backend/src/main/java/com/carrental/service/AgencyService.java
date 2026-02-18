package com.carrental.service;

import com.carrental.dto.AgencyDTO;
import com.carrental.entity.Agency;
import com.carrental.repository.AgencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgencyService {
    
    @Autowired
    private AgencyRepository agencyRepository;
    
    public List<AgencyDTO> getAllActiveAgencies() {
        return agencyRepository.findByActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AgencyDTO> searchAgencies(String search) {
        if (search == null || search.trim().isEmpty()) {
            return getAllActiveAgencies();
        }
        return agencyRepository.searchAgencies(search).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AgencyDTO> getAirportAgencies() {
        return agencyRepository.findByIsAirportTrueAndActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public AgencyDTO getAgencyById(Long id) {
        Agency agency = agencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agency not found"));
        return convertToDTO(agency);
    }
    
    private AgencyDTO convertToDTO(Agency agency) {
        AgencyDTO dto = new AgencyDTO();
        dto.setId(agency.getId());
        dto.setName(agency.getName());
        dto.setCity(agency.getCity());
        dto.setAddress(agency.getAddress());
        dto.setPhoneNumber(agency.getPhoneNumber());
        dto.setEmail(agency.getEmail());
        dto.setLatitude(agency.getLatitude());
        dto.setLongitude(agency.getLongitude());
        dto.setAirport(agency.isAirport());
        dto.setAirportCode(agency.getAirportCode());
        return dto;
    }
}
