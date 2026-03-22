package com.waste2worth.backend.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PickupRequest {
    private String address;
    private LocalDate pickupDate;
    
    // Notice what is missing? No userId, no status, no createdAt!
    // The frontend only sends exactly what it is allowed to control.
}