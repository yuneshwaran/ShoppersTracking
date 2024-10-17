package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.dto.ShelfSensorLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShelfSensorLogRepo extends JpaRepository<ShelfSensorLog, Integer> {
    List<ShelfSensorLog> findByShelf_Id(int shelfId);

    @Query(value = "SELECT * FROM shelf_sensor_log ORDER BY entry_time DESC ;",nativeQuery = true)
    List<ShelfSensorLog> findAllDesc();
}
