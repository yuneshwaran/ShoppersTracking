package com.backend.ShopperTracking.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private int id;
    private String brandName;
    private String productName;
    private int price;

    @Check(constraints = "stock>0")
    private int stock;

    @OneToOne
    @JoinColumn(name = "id")
    private ShelfSensor shelfSensor;

}
