package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.TrialRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrialRoomRepo extends JpaRepository<TrialRoom, Integer> {

    List<TrialRoom> findByLocation(String location);
}
