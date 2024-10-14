package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.dto.TrialRoomLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrialRoomLogRepo extends JpaRepository<TrialRoomLog, Integer> {

    TrialRoomLog findByCustomerIdAndProductId(int customerId, int productId);

    List<TrialRoomLog> findByCustomerId(int customerId);

    @Query(value = "SELECT * FROM trial_room_log ORDER BY entry_time DESC",nativeQuery = true)
    List<TrialRoomLog> findAllDesc();
}
