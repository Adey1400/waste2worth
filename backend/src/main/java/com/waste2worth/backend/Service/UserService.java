package com.waste2worth.backend.Service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.waste2worth.backend.DTO.UserProfileResponse;
import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileResponse getMyProfile() {
         
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        //Fetching user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
          
        //Packaging the safe data into our DTO and send it back
        return UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .coins(user.getCoins())
                .role(user.getRole().name())
                .build();
    }
}