package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.repository.InventoryRepo;
import com.backend.ShopperTracking.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ProductRepo productRepo;

    // Get all inventory items
    public List<Inventory> getInventory() {
        return inventoryRepo.findAll();
    }

    // Get inventory by product ID
    public Optional<Inventory> getInventoryByProductId(int productId) {
        return inventoryRepo.findByProduct_Id(productId);
    }

    public Inventory getInventoryById(int productId) {
        return inventoryRepo.getInventoryByProductId(productId);
        //return inventoryRepo.findById(inventoryId).orElse(null);
    }

    public String updateQuantity(int productId, int quantity) {
        Inventory inventory = inventoryRepo.getInventoryByProductId(productId);
        inventory.setQuantity(quantity);
        inventoryRepo.save(inventory);
        return "Quantity Updated";
    }

    public String addInventory(Inventory inventory) {

        Product product = inventory.getProduct();
        Inventory inv = inventoryRepo.getInventoryByProductId(product.getId());

        if(inv!=null) {
            inv.setProduct(productRepo.findById(product.getId()).orElse(null));
            inv.setQuantity( inventory.getQuantity());
            inv.setLastUpdated(new Date());
            inventoryRepo.save(inv);
        }

        return "Inventory Added";

    }
}
