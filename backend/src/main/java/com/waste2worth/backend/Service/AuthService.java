package com.waste2worth.backend.Service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.waste2worth.backend.Auth.AuthResponse;
import com.waste2worth.backend.DTO.AuthRequest;
import com.waste2worth.backend.DTO.RegisterRequest;
import com.waste2worth.backend.Entity.Role;
import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final JWTService jwtService;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request){
     System.out.println("👉 Registering User: "+ request.getEmail());
     User user = new User();
     user.setFirstName(request.getFirstName());
     user.setLastName(request.getLastName());
     user.setEmail(request.getEmail());
     
     user.setPassword(passwordEncoder.encode(request.getPassword()));


     user.setRole(Role.ADMIN); 
     user.setCoins(0);

     User savedUser = userRepository.save(user);

     var jwtToken = jwtService.generateToken(savedUser);


     return AuthResponse.builder()
                        .token(jwtToken)
                        .role(savedUser.getRole())
                        .id(savedUser.getId())
                        .firstName(savedUser.getFirstName())
                        .email(savedUser.getEmail())
                        .coins(savedUser.getCoins())
                        .build();

  }

  public AuthResponse authenticate(AuthRequest request){
    System.out.println("👉 Login Attempt for: [" + request.getEmail() + "]");
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new IllegalArgumentException("User not found in DB"));

        var jwtToken = jwtService.generateToken(user);
            System.out.println("✅ Login Successful. Token Generated.");

            return AuthResponse.builder()
                    .token(jwtToken)
                    .role(user.getRole())
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .email(user.getEmail())
                    .coins(user.getCoins())
                    .build();

    } catch (Exception e) {
      System.out.println("❌ Login Failed: " + e.getMessage());
            throw new BadCredentialsException("Invalid Email or Password");
    }
  }
}
