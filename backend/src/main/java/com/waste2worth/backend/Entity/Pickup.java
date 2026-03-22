package com.waste2worth.backend.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="pickup")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pickup {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;


    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name= "user_id", nullable= false)
    private User user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;
    
    private LocalDate pickupDate;
    
    @Enumerated(EnumType.STRING)
    private PickupStatus status = PickupStatus.PENDING;

    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
    }
}
