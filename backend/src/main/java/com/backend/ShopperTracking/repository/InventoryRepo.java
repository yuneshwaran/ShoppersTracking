package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Integer> {
    Optional<Inventory> findByProduct(Product product);

    Optional<Inventory> findByProduct_Id(int productId);

    @Query(value = "SELECT * FROM inventory WHERE product_id = ?1",nativeQuery = true)
    Inventory getInventoryByProductId(int productId);


}
