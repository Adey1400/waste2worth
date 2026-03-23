package com.waste2worth.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waste2worth.backend.DTO.WasteRequest;
import com.waste2worth.backend.Entity.Waste;
import com.waste2worth.backend.Service.WasteService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/waste")
@RequiredArgsConstructor
public class WasteController {
    private final WasteService wasteService;

    @PostMapping("/pickup/{pickupId}")
    public ResponseEntity<Waste> processPickupWaste(
        @PathVariable Integer pickupId, 
            @RequestBody WasteRequest request
    ){
        return ResponseEntity.ok(wasteService.processWaste(pickupId, request));
    }

}
