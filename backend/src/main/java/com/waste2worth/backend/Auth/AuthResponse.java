package com.waste2worth.backend.Auth;

import com.waste2worth.backend.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    
    private String token;
    private Role role;
    private Integer id; 
    private String firstName;
    private String email;
    private int coins;

}