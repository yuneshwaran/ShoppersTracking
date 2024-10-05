package com.backend.ShopperTracking.model.logs;

import com.backend.ShopperTracking.model.Shelf;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "shelf_sensor_log")
@Getter
@Setter
public class ShelfSensorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "shelf_id", nullable = false)
    private Shelf shelf;

    private Date entryTime;  // Timestamp when customer is detected near the shelf
    private Date exitTime;   // Timestamp when customer leaves the shelf area

    @Transient
    private long waitTime;   // Calculated time (not persisted)

    public long calculateWaitTime() {
        if (entryTime != null && exitTime != null) {
            return exitTime.getTime() - entryTime.getTime();
        }
        return 0;
    }
}
