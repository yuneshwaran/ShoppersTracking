package com.backend.ShopperTracking.service;


import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.repository.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    InventoryRepo inventoryRepo;

    public List<Inventory> getInventory() {
        return  inventoryRepo.findAll();
    }

}
