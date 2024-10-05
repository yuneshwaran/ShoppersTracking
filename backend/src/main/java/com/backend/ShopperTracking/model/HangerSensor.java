package com.backend.ShopperTracking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "hanger_sensor")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HangerSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Shelf shelf;

    @ManyToOne
    private Product product;

}
