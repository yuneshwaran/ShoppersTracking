package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    @Autowired
    ProductRepo repo ;

    public List<Product> getAllProducts(){
        return repo.findAll();
    }

    public List<Product> getProductsByBrand(int brandId){
        return repo.findProductByBrandid(brandId);
    }

    public String addProduct(Product product) {
        repo.save(product);
        return "Product added successfully";
    }

    public String deleteProduct(int pid) {
        repo.deleteById(pid);
        return "Product deleted successfully";
    }

    public String updateProduct(Product product) {
        repo.save(product);
        return "Product updated successfully";
    }

    public List<Product> getAllProductsByShelf(int id) {
        return repo.findProductByShelfId(id);
    }

    public Product getProductById(int productId) {
        return repo.findById(productId).get();
    }
}
