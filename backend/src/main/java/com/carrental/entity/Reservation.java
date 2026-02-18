package com.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String reservationNumber;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;
    
    @ManyToOne
    @JoinColumn(name = "pickup_agency_id", nullable = false)
    private Agency pickupAgency;
    
    @ManyToOne
    @JoinColumn(name = "return_agency_id", nullable = false)
    private Agency returnAgency;
    
    @Column(nullable = false)
    private LocalDate pickupDate;
    
    @Column(nullable = false)
    private LocalTime pickupTime;
    
    @Column(nullable = false)
    private LocalDate returnDate;
    
    @Column(nullable = false)
    private LocalTime returnTime;
    
    @Column(nullable = false)
    private Double totalPrice;
    
    @Column(nullable = false)
    private String paymentType;
    
    private String discountCode;
    
    private Double discountAmount;
    
    @Column(nullable = false)
    private String status = "PENDING";
    
    private boolean driverAge25Plus = true;
    
    private String customerFirstName;
    
    private String customerLastName;
    
    private String customerEmail;
    
    private String customerPhone;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
