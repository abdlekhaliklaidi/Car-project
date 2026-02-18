package com.carrental.dto;

import lombok.Data;

@Data
public class AgencyDTO {
    private Long id;
    private String name;
    private String city;
    private String address;
    private String phoneNumber;
    private String email;
    private Double latitude;
    private Double longitude;
    private boolean isAirport;
    private String airportCode;
}
