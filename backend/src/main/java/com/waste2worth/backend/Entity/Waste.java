package com.waste2worth.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "waste")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Waste {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_id", nullable = false)
    @JsonIgnore
    private Pickup pickup;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WasteType wasteType;

    // We can store weight in kilograms (e.g., 2.5)
    @Column(nullable = false)
    private Double weightInKg;

    // How many coins this specific batch of waste generated
    @Column(nullable = false)
    private Integer coinsEarned;
}