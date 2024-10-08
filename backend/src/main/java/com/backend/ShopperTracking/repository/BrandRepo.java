package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Integer> {

}
