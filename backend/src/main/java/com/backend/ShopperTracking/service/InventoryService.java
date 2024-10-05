package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.repository.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    // Get all inventory items
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    // Get inventory by product ID
    public Optional<Inventory> getInventoryByProductId(int productId) {
        return inventoryRepo.findByProduct_Id(productId);
    }

    // Update inventory quantity
    public Inventory updateInventory(Inventory inventory) {
        return inventoryRepo.save(inventory);
    }

    public List<Inventory> getInventory() {
        return inventoryRepo.findAll();
    }
}
