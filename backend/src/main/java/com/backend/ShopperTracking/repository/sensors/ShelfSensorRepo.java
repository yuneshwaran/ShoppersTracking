package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.model.ShelfSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelfSensorRepo extends JpaRepository<ShelfSensor, Integer> {
    ShelfSensor findByShelf_Id(int shelfId);
}
