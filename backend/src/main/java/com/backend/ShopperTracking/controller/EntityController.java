package com.backend.ShopperTracking.controller;

import com.backend.ShopperTracking.model.*;
import com.backend.ShopperTracking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EntityController {

    @Autowired
    ShelfService shelfService;

    @Autowired
    BrandService brandService;

    @Autowired
    ProductsService productsService;

    @Autowired
    InventoryService inventoryService;

    @Autowired
    TrialRoomService trialRoomService;



    //shelf
    @GetMapping("/shelf")
    public List<Shelf> getShelves() {
        return shelfService.getShelves();
    }
    @GetMapping("/shelf/{id}")
    public Shelf getShelf(@PathVariable int id) {
        return shelfService.getShelf(id);
    }
    @GetMapping("/shelf/{id}/product")
    public List<Product> getProduct(@PathVariable int id) {
        return productsService.getAllProductsByShelf(id);
    }
    @PostMapping("/shelf")
    public String getShelves(@RequestBody Shelf shelf) {
        return shelfService.addShelf(shelf);
    }
    @PutMapping("/shelf/{id}")
    public String updateShelves(@PathVariable int id, @RequestBody Shelf shelf) {
        return shelfService.updateShelf(shelf);
    }
    @DeleteMapping("/shelf/{id}")
    public String deleteShelves(@PathVariable int id) {
        return shelfService.deleteShelf(id);
    }


    //brand
    @GetMapping("/brand")
    public List<Brand> getBrands() {
        return brandService.getBrands();
    }
    @GetMapping("/brand/{id}")
    public Brand getBrand(@PathVariable int id) {
        return brandService.getBrand(id);
    }
    @PostMapping("/brand")
    public String addBrand(@RequestBody Brand brand) {
        return brandService.addBrand(brand);
    }
    @PutMapping("/brand/{id}")
    public String updateBrand(@RequestBody Brand brand) {
        return brandService.updateBrand(brand);
    }
    @DeleteMapping("/brand/{id}")
    public String deleteBrand(@PathVariable int id) {
        return brandService.deleteById(id);
    }


    //products
    @GetMapping("/brand/product")
    public List<Product> getProducts() {
        return productsService.getAllProducts();
    }
    @GetMapping("/brand/{id}/product")
    public List<Product> getProducts(@PathVariable int id) {
        return productsService.getProductsByBrand(id);
    }
    @PostMapping("/brand/product")
    public String addProduct(@RequestBody Product product) {
        return productsService.addProduct(product);
    }
    @PutMapping("/brand/product")
    public String updateProduct(@RequestBody Product product) {
        return productsService.updateProduct(product);
    }
    @DeleteMapping("/brand/product/{pid}")
    public String deleteProduct(@PathVariable int pid) {
        return productsService.deleteProduct(pid);
    }


    //Trial Room
    @GetMapping("/trialroom")
    public List<TrialRoom> getAllTrialRooms() {
        return trialRoomService.getAllTrialRooms();
    }
    @GetMapping("/trialroom/{id}")
    public TrialRoom getTrialRoom(@PathVariable int id) {
        return trialRoomService.getTrialRoomById(id);
    }
    @PostMapping("/trialroom")
    public String addTrialRoom(@RequestBody TrialRoom trialRoom) {
        return trialRoomService.addTrialRoom(trialRoom);
    }
    @PutMapping("/trialroom")
    public String updateTrialRoom(@RequestBody TrialRoom trialRoom) {
        return trialRoomService.updateTrialRoom(trialRoom);
    }
    @DeleteMapping("/trialroom/{id}")
    public String deleteTrialRoom(@PathVariable int id) {
        return trialRoomService.deleteTrialRoom(id);
    }

    //inventory
    @GetMapping("/stock")
    public ResponseEntity<List<Inventory>> getInventory() {
        List<Inventory> inventoryList = inventoryService.getInventory();
        return ResponseEntity.ok(inventoryList);
    }
    @PostMapping("/stock")
    public String addInventory(@RequestBody Inventory inventory) {
        return inventoryService.addInventory(inventory);
    }

    // Endpoint to get a single inventory item by product ID
    @GetMapping("/stock/{productId}")
    public Inventory getInventoryById(@PathVariable int productId) {
        return inventoryService.getInventoryById(productId);
    }
    // Endpoint to manually update inventory for a product
    @PutMapping("/stock/{productId}")
    public String updateInventory(@PathVariable int productId, @RequestBody Inventory updatedInventory) {

        int quantity = updatedInventory.getQuantity();

        return inventoryService.updateQuantity(productId, quantity);
    }
}
