package com.backend.ShopperTracking.model.logs;

import com.backend.ShopperTracking.model.HangerSensor;
import com.backend.ShopperTracking.model.Product;
import com.backend.ShopperTracking.model.TrialRoom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "TrialRoomLog")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TrialRoomLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private TrialRoom trialRoom;

    private int customerId;

    private Date entryTime;

    @ManyToOne
    private Product product;

    @ManyToOne
    private HangerSensor hangerSensor;

    // Removed exitTime and purchased fields, along with the related methods
}
