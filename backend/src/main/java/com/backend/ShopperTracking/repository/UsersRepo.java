package com.backend.ShopperTracking.repository;

import com.backend.ShopperTracking.model.Users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepo extends JpaRepository<Users, Integer> {

    Users getUsersByUsername(String username);


    Users getUserByUsername(String username);

}
