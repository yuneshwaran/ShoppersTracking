package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Brand;
import com.backend.ShopperTracking.repository.BrandRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {

    @Autowired
    BrandRepo brandRepo;

    public List<Brand> getBrands() {
        return brandRepo.findAll();
    }

    public Brand getBrand(int id) {
        return brandRepo.findById(id).orElse(null);
    }
    public String saveBrand(Brand brand) {
         brandRepo.save(brand);
         return "Brand saved";
    }

    public String addBrand(Brand brand) {
        brandRepo.save(brand);
        return "Brand saved";
    }

    public String updateBrand(Brand brand) {
        brandRepo.save(brand);
        return "Brand Updated";
    }

    public String deleteById(int id) {
        brandRepo.deleteById(id);
        return "Brand deleted";
    }
}
