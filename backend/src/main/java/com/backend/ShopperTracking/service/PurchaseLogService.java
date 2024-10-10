package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.dto.PurchaseLogRequest;
import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.dto.PurchaseLog;
import com.backend.ShopperTracking.repository.InventoryRepo;
import com.backend.ShopperTracking.repository.ProductRepo;
import com.backend.ShopperTracking.repository.PurchaseLogRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PurchaseLogService {

    @Autowired
    private PurchaseLogRepo purchaseLogRepo;

    @Autowired
    private InventoryRepo inventoryRepo;

    @Autowired
    private ProductRepo productRepo;

    public PurchaseLog createPurchaseLog(PurchaseLogRequest request) {

        Product product = productRepo.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));


        Inventory inventory = inventoryRepo.findByProduct(product)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));


        if (inventory.getQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }


        inventory.setQuantity(inventory.getQuantity() - request.getQuantity());
        inventory.setLastUpdated(new Date());


        inventoryRepo.save(inventory);


        PurchaseLog purchaseLog = new PurchaseLog();
        purchaseLog.setProduct(product);
        purchaseLog.setQuantity(request.getQuantity());

        //price handling
        if(request.getTotalPrice()<=0){
            purchaseLog.setTotalPrice(request.getQuantity() * product.getPrice());
        }
        else {
            purchaseLog.setTotalPrice(request.getTotalPrice());
        }
        //purchaseLog.setTotalPrice(request.getTotalPrice()); // Calculate based on request
        purchaseLog.setPurchaseDate(new Date());

        return purchaseLogRepo.save(purchaseLog);
    }

    public List<PurchaseLog> getAll() {
        return purchaseLogRepo.findAllPurchses();
    }
}
