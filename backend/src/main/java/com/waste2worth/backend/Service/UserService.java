package com.waste2worth.backend.Service;

import org.springframework.stereotype.Service;
import com.waste2worth.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    // We will add methods here later like:
    // public UserProfileDTO getUserProfile(String email) { ... }
    // public void addCoins(Integer userId, int amount) { ... }
}