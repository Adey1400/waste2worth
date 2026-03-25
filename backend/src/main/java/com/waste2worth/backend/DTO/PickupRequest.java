package com.waste2worth.backend.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class PickupRequest {
    private String wasteType; 
    private Double weight;    
    private String address;
    private LocalDate pickupDate; 
}