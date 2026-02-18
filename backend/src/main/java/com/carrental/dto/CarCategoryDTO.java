package com.carrental.dto;

import lombok.Data;

@Data
public class CarCategoryDTO {
    private Long id;
    private String name;
    private String nameFr;
    private String description;
    private Integer displayOrder;
}
