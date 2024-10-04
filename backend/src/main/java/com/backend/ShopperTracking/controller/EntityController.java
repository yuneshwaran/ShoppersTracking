package com.backend.ShopperTracking.controller;


import com.backend.ShopperTracking.model.Brand;
import com.backend.ShopperTracking.model.Inventory;
import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.model.Shelf;
import com.backend.ShopperTracking.service.BrandService;
import com.backend.ShopperTracking.service.InventoryService;
import com.backend.ShopperTracking.service.ProductsService;
import com.backend.ShopperTracking.service.ShelfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntityController {

    @Autowired
    ShelfService shelfService;

    @Autowired
    BrandService brandService;

    @Autowired
    ProductsService productsService;

    @Autowired
    InventoryService inventoryService;

//inventory
    @GetMapping("/stock")
    public List<Inventory> getStock() {
        return inventoryService.getInventory();
    }

//shelf
    @GetMapping("/shelf")
    public List<Shelf> getShelves() {
        return shelfService.getShelves();
    }
    @GetMapping("/shelf/{id}")
    public Shelf getShelf(@PathVariable int id) {
        return shelfService.getShelf(id);
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

}
