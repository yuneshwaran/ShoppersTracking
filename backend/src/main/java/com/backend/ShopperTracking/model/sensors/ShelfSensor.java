package com.backend.ShopperTracking.model.sensors;

import com.backend.ShopperTracking.model.Shelf;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "ShelfSensor")
@Getter
@Setter
public class ShelfSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int shelfSensorId;

    @OneToOne
    private Shelf shelf;

    private Date createdOn;


}
