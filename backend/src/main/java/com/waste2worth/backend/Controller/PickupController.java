package com.waste2worth.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waste2worth.backend.DTO.PickupRequest;
import com.waste2worth.backend.Entity.Pickup;
import com.waste2worth.backend.Service.PickupServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pickups")
@RequiredArgsConstructor
public class PickupController {
    private final PickupServices pickupService;

    @PostMapping
    public ResponseEntity<Pickup> create(@RequestBody PickupRequest request) {
        return ResponseEntity.ok(pickupService.createPickup(request));
    }
}