package com.backend.ShopperTracking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
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
    private Date LastUpdated;

    @ManyToOne
    private Brand brand;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<HangerSensor> hangerSensor;

    @OneToOne(mappedBy = "product")
    @JsonIgnore
    private Inventory inventory;


}
