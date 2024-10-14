package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {


    @Query(value = "SELECT * FROM product WHERE brand_id = ?1",nativeQuery = true)
    List<Product> findProductByBrandid(int brand_id);

    @Query(value = "SELECT * FROM product WHERE shelf_id = ?1",nativeQuery = true)
    List<Product> findProductByShelfId(int id);

}
