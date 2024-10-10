package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.dto.PurchaseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseLogRepo extends JpaRepository<PurchaseLog, Integer> {


    @Query(value = "SELECT * FROM purchase_log ORDER BY purchase_date DESC ;",nativeQuery = true)
    List<PurchaseLog> findAllPurchses();
}
