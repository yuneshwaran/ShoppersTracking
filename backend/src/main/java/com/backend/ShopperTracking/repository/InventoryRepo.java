package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, Integer> {
    Optional<Inventory> findByProduct(Product product);

    Optional<Inventory> findByProduct_Id(int productId);

}
