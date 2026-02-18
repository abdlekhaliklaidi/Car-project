package com.carrental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CarCategory category;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String model;
    
    private String exampleModel;
    
    private Integer year;
    
    @Column(nullable = false)
    private Integer seats;
    
    @Column(nullable = false)
    private Integer doors;
    
    @Column(nullable = false)
    private String transmission;
    
    private String fuelType;
    
    private boolean isHybrid = false;
    
    private boolean hasAirConditioning = true;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private Double payAtAgencyPrice;
    
    @Column(nullable = false)
    private Double payNowPrice;
    
    private boolean available = true;
    
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
