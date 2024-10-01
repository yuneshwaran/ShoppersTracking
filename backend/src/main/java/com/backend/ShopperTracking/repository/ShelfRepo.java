package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Shelf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShelfRepo extends JpaRepository<Shelf, Integer> {

}
