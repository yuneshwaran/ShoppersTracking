package com.backend.ShopperTracking.repository.sensors;

import com.backend.ShopperTracking.model.logs.TrialRoomLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrialRoomLogRepo extends JpaRepository<TrialRoomLog, Integer> {

    TrialRoomLog findByCustomerIdAndProductId(int customerId, int productId);

    List<TrialRoomLog> findByCustomerId(int customerId);
}
