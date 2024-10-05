package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.model.HangerSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HangerSensorRepo extends JpaRepository<HangerSensor, Integer> {
    // You can add custom query methods if needed
    List<HangerSensor> findByShelf_Id(int shelfId);  // Fetch all sensors by shelf ID
    List<HangerSensor> findByProduct_Id(int productId);  // Fetch all sensors by product ID
}
