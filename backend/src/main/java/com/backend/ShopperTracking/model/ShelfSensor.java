package com.backend.ShopperTracking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "shelf_sensor")
@Getter
@Setter
public class ShelfSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "shelf_id", nullable = false)
    private Shelf shelf;

    // You can add other sensor-specific fields as needed
}
