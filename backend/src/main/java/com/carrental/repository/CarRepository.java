package com.carrental.repository;

import com.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    
    List<Car> findByAvailableTrue();
    
    @Query("SELECT c FROM Car c WHERE c.available = true AND c.id NOT IN " +
           "(SELECT r.car.id FROM Reservation r WHERE r.status NOT IN ('CANCELLED', 'COMPLETED') " +
           "AND ((r.pickupDate <= :returnDate AND r.returnDate >= :pickupDate))) " +
           "ORDER BY c.payNowPrice ASC")
    List<Car> findAvailableCars(@Param("pickupDate") LocalDate pickupDate, 
                                @Param("returnDate") LocalDate returnDate);
    
    List<Car> findByCategoryIdAndAvailableTrue(Long categoryId);
}
