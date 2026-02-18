package com.carrental.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class SearchRequest {
    private Long pickupAgencyId;
    private Long returnAgencyId;
    private LocalDate pickupDate;
    private LocalTime pickupTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private boolean driverAge25Plus = true;
    private String discountCode;
}
