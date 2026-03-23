package com.waste2worth.backend.Entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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
    @OneToMany(mappedBy = "pickup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Waste> wasteItems = new ArrayList<>();

}
