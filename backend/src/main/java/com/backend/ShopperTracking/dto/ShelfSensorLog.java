package com.backend.ShopperTracking.dto;

import com.backend.ShopperTracking.model.Shelf;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class ShelfSensorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Shelf shelf;

    private Date entryTime;
    private Date exitTime;

    @Column(insertable = false, updatable = false)
    private Integer duration;

}
