package com.backend.ShopperTracking.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
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
    private Date LastUpdated;

    @OneToOne(cascade = CascadeType.ALL,mappedBy = "shelf")
    @JsonIgnore
    private ShelfSensor sensor;

    @OneToMany(mappedBy = "shelf")
    @JsonIgnore
    private List<Product> products;


    @OneToMany(mappedBy = "shelf")
    @JsonIgnore
    private List<HangerSensor> hangerSensor;

    //Getter Setter

}
