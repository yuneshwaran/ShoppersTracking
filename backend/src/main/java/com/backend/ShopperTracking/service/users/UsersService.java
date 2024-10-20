package com.backend.ShopperTracking.service.users;

import com.backend.ShopperTracking.model.Users.Users;
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

        System.out.println(user.toString());
        user.setPassword(encoder.encode(user.getPassword()));

        //user role null handling
        if(user.getRole() == null){
            user.setRole("ROLE_USER");
        }

        //filter user role
        if(user.getRole().contains("admin")){
            user.setRole("ROLE_ADMIN");
        }

        repo.save(user);
        return "Saved";
    }
    public String updateUser (Users user){

        Users newUser = repo.getUserByUsername(user.getUsername());
        newUser.setPassword(encoder.encode(user.getPassword()));
        repo.save(newUser);

        return "Updated";
    }

}
