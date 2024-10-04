package com.backend.ShopperTracking.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tracking")
public class LoggingController {

    @GetMapping("/")
    public String index() {
        return "Hello World";
    }

}
