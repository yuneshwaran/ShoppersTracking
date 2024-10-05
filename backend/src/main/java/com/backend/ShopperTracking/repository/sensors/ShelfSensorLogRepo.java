package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.model.logs.ShelfSensorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShelfSensorLogRepo extends JpaRepository<ShelfSensorLog, Integer> {
    List<ShelfSensorLog> findByShelf_Id(int shelfId);
}
