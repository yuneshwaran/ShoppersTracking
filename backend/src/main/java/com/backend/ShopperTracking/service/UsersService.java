package com.backend.ShopperTracking.service;

import com.backend.ShopperTracking.model.Users;
import com.backend.ShopperTracking.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    UsersRepo repo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10); //bycrypt

    public String saveUser (Users user){

        user.setPassword(encoder.encode(user.getPassword()));

        //filter user role
        if(user.getRole().contains("admin")){
            user.setRole("ROLE_ADMIN");
        }
        else if(user.getRole().contains("user")){
            user.setRole("ROLE_USER");
        }

        repo.save(user);
        return "Saved";
    }

}
