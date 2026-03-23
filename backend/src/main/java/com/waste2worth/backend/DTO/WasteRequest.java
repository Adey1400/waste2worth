package com.waste2worth.backend.DTO;

import com.waste2worth.backend.Entity.WasteType;

import lombok.Data;

@Data
public class WasteRequest {
    private WasteType wasteType;
    private Double weightInKg;
}
