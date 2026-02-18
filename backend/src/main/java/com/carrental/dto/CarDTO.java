package com.carrental.dto;

import lombok.Data;

@Data
public class CarDTO {
    private Long id;
    private String name;
    private String model;
    private String exampleModel;
    private Integer year;
    private Integer seats;
    private Integer doors;
    private String transmission;
    private String fuelType;
    private boolean isHybrid;
    private boolean hasAirConditioning;
    private String imageUrl;
    private Double payAtAgencyPrice;
    private Double payNowPrice;
    private Double savings;
    private CarCategoryDTO category;
}
