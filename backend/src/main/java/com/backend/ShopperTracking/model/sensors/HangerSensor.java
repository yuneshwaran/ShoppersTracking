package com.backend.ShopperTracking.model.sensors;


import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.model.Shelf;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "HangerSensor")
@Getter
@Setter
public class HangerSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonIgnore
    private Product product;

    @ManyToOne
    @JsonIgnore
    private Shelf shelf;

    //Getter Setter

}
