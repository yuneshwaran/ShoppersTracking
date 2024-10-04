package com.backend.ShopperTracking.model;

import com.backend.ShopperTracking.model.sensors.HangerSensor;
import com.backend.ShopperTracking.model.sensors.ShelfSensor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shelf")
@Getter
@Setter
public class Shelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String location;

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "shelf")
    @JsonIgnore
    private ShelfSensor sensor;

//    @OneToMany(mappedBy = "shelf")
//    @JsonIgnore
//    private List<Brand> brand = new ArrayList<>();

    @OneToMany(mappedBy = "shelf")
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "shelf")
    @JsonIgnore
    private List<HangerSensor> hangerSensor = new ArrayList<>();

    //Getter Setter

}
