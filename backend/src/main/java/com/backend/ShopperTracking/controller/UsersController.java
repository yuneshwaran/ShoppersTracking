package com.backend.ShopperTracking.controller;

import com.backend.ShopperTracking.model.Users;
import com.backend.ShopperTracking.service.JWTService;
import com.backend.ShopperTracking.service.UsersService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
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
