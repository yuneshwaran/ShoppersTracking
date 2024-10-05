package com.backend.ShopperTracking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrialRoomLogRequest {
    private int trialRoomId;
    private int productId;
    private int customerId;
    private int hangerId;
    // Getters and setters
}
