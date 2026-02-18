package com.carrental.repository;

import com.carrental.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    Optional<Reservation> findByReservationNumber(String reservationNumber);
    
    List<Reservation> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Reservation> findByCustomerEmailOrderByCreatedAtDesc(String email);
    
    List<Reservation> findByStatus(String status);
}
