package com.backend.ShopperTracking.model;

import com.backend.ShopperTracking.model.logs.TrialRoomLog;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TrialRoom")
public class TrialRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String location;

    @OneToMany(mappedBy = "trialRoom", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TrialRoomLog> logs = new ArrayList<>();

    // Optional: You can add additional methods if necessary
}
