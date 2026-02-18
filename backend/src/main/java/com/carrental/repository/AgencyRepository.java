package com.carrental.repository;

import com.carrental.entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {
    
    List<Agency> findByActiveTrue();
    
    List<Agency> findByCityContainingIgnoreCaseAndActiveTrue(String city);
    
    List<Agency> findByIsAirportTrueAndActiveTrue();
    
    @Query("SELECT a FROM Agency a WHERE " +
           "LOWER(a.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.city) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.airportCode) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Agency> searchAgencies(@Param("search") String search);
}
