package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.dto.PurchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseLogRepo extends JpaRepository<PurchaseLog, Integer> {


}
