package com.waste2worth.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.waste2worth.backend.DTO.UserProfileResponse;
import com.waste2worth.backend.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse>getMyProfile(){
        return ResponseEntity.ok(userService.getMyProfile());
    }
}
