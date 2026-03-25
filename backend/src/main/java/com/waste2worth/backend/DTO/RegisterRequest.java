package com.waste2worth.backend.DTO;


import com.waste2worth.backend.Entity.Role;

import lombok.Data;

@Data 
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}