package com.backend.ShopperTracking.controller;

import com.backend.ShopperTracking.model.Users.Users;
import com.backend.ShopperTracking.service.users.JWTService;
import com.backend.ShopperTracking.service.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    @Autowired
    UsersService usersService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTService jwtService;


    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        return usersService.saveUser(user);
    }

    @PutMapping("/login")
    public String password(@RequestBody Users user) {
        return usersService.updateUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            return jwtService.generateJWT(user.getUsername());
        }
        else {
            return "fail";
        }
    }
}
