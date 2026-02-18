package com.carrental.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
public class ReservationResponse {
    private Long id;
    private String reservationNumber;
    private CarDTO car;
    private AgencyDTO pickupAgency;
    private AgencyDTO returnAgency;
    private LocalDate pickupDate;
    private LocalTime pickupTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private Double totalPrice;
    private String paymentType;
    private String status;
    private LocalDateTime createdAt;
    private String customerFirstName;
    private String customerLastName;
    private String customerEmail;
    private String customerPhone;
}
