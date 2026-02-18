package com.carrental.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReservationRequest {
    private Long carId;
    private Long pickupAgencyId;
    private Long returnAgencyId;
    private LocalDate pickupDate;
    private LocalTime pickupTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private String paymentType;
    private String discountCode;
    private boolean driverAge25Plus;
    private String customerFirstName;
    private String customerLastName;
    private String customerEmail;
    private String customerPhone;
}
