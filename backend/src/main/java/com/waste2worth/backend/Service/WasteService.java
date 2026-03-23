package com.waste2worth.backend.Service;

import org.springframework.stereotype.Service;

import com.waste2worth.backend.DTO.WasteRequest;
import com.waste2worth.backend.Entity.Pickup;
import com.waste2worth.backend.Entity.PickupStatus;
import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Entity.Waste;
import com.waste2worth.backend.Entity.WasteType;
import com.waste2worth.backend.Repository.PickupRepository;
import com.waste2worth.backend.Repository.UserRepository;
import com.waste2worth.backend.Repository.WasteRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WasteService {
  private final WasteRepository wasteRepository;
  private final PickupRepository pickupRepository;
  private final UserRepository userRepository;


  @Transactional
  public Waste processWaste(Integer pickupId, WasteRequest request){
    //finding pickup
    Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new IllegalArgumentException("Pickup not found"));
     
    //Calculation of coins
    int coinsEarned=calculateCoins(request.getWasteType(), request.getWeightInKg());


    //saving waste record
    Waste waste = new Waste();
    waste.setPickup(pickup);
    waste.setWasteType(request.getWasteType());
    waste.setWeightInKg(request.getWeightInKg());
    waste.setCoinsEarned(coinsEarned);
    wasteRepository.save(waste);


    //rewarding the user
    User user = pickup.getUser();
    user.setCoins(user.getCoins()+coinsEarned);
    userRepository.save(user);


    //Updating pickup status 
    pickup.setStatus(PickupStatus.COMPLETED);
    pickupRepository.save(pickup);
     return waste;
  }

  //Math Logic
  private int calculateCoins(WasteType type, Double weight){
    int ratePerKg = switch(type){
        case PLASTIC -> 10;     
            case PAPER -> 5;        
            case GLASS -> 8;        
            case METAL -> 15;       
            case ELECTRONIC -> 25;  
    };
    return (int) (ratePerKg * weight);
  }
}
