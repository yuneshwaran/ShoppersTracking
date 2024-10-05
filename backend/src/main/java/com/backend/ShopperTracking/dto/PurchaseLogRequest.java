package com.backend.ShopperTracking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseLogRequest {
    private int productId;
    private int quantity;
    private double totalPrice;
}
