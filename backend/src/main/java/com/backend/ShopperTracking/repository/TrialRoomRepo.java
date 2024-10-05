package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.TrialRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrialRoomRepo extends JpaRepository<TrialRoom, Integer> {
    // You can define custom query methods here if needed
    List<TrialRoom> findByLocation(String location);
}
