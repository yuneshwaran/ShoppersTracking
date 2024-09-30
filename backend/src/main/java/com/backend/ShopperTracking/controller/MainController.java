package com.backend.ShopperTracking.controller;

import com.backend.ShopperTracking.model.Users;
import com.backend.ShopperTracking.service.UsersService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @Autowired
    UsersService usersService;

    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        usersService.saveUser(user);
        return user;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return "Hello";
    }

    @GetMapping("/hello")
    public String greeting(HttpServletRequest request) {
        return "Hello World"+ request.getSession().getId();
    }

    @GetMapping("/")
    public String greet(HttpServletRequest request) {
        return "Hello World"+ request.getSession().getId();
    }


}
