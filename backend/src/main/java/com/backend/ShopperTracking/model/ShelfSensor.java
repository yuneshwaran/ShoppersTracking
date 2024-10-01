package com.backend.ShopperTracking.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class ShelfSensor {

    @Id
    private int sensor_id;

    @ManyToOne
    private Shelf shelf;

    @OneToOne
    private Product product;

}
