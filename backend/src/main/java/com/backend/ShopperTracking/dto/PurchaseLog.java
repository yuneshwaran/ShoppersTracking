package com.backend.ShopperTracking.dto;

import com.backend.ShopperTracking.model.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "PurchaseLog")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PurchaseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private Product product;

    private int quantity;
    private double totalPrice;
    private Date purchaseDate;

}
