package com.carrental.repository;

import com.carrental.entity.CarCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarCategoryRepository extends JpaRepository<CarCategory, Long> {
    List<CarCategory> findAllByOrderByDisplayOrderAsc();
}
