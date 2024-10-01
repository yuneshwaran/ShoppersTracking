package com.backend.ShopperTracking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Cotroller {

    //Index page
    @GetMapping("/")
    public String index() {
        return "index";
    }

}
