package com.waste2worth.backend.Controller;

import com.waste2worth.backend.DTO.UpdateProfileRequest;
import com.waste2worth.backend.DTO.UserProfileResponse;
import com.waste2worth.backend.Service.UserService;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile() {
        return ResponseEntity.ok(userService.getMyProfile());
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(@RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(userService.updateMyProfile(request));
    }

    @DeleteMapping("/profile")
    public ResponseEntity<Map<String,String>> deleteProfile() {
        userService.deleteMyProfile();
        return ResponseEntity.ok(Map.of("messgae","Account deleted successfully."));
    }

    @PostMapping("/profile/picture")
    public ResponseEntity<UserProfileResponse> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(userService.uploadProfilePicture(file));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
