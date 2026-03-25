package com.waste2worth.backend.Service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.waste2worth.backend.DTO.PickupRequest;
import com.waste2worth.backend.Entity.Pickup;
import com.waste2worth.backend.Entity.PickupStatus;
import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Repository.PickupRepository;
import com.waste2worth.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PickupServices {
   private final UserRepository userRepository;
   private final PickupRepository pickupRepository;

   public Pickup createPickup(PickupRequest request){
     String email = SecurityContextHolder.getContext().getAuthentication().getName();

     User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    Pickup pickup = new Pickup();
    pickup.setAddress(request.getAddress());
    pickup.setPickupDate(request.getPickupDate());
    pickup.setUser(user);
    pickup.setStatus(PickupStatus.PENDING);
    return pickupRepository.save(pickup);
   }

public List<Pickup> getMyPickups(){
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return pickupRepository.findByUserEmail(email);
}

public List<Pickup> getAllPendingPickups() {
   return pickupRepository.findByStatus(PickupStatus.PENDING);
}
}
