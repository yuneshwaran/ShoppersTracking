package com.backend.ShopperTracking.model;

import com.backend.ShopperTracking.model.sensors.HangerSensor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int price;

    @ManyToOne
    private Brand brand;

    @ManyToOne
    private Shelf shelf;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<HangerSensor> hanger_sensor;

    @OneToOne(mappedBy = "product")
    @JsonIgnore
    private Inventory inventory;
    //Getter Setter

}
