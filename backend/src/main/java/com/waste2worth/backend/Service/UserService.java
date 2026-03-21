package com.waste2worth.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.waste2worth.backend.DTO.RegisterRequest;
import com.waste2worth.backend.Entity.Role;
import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  @Autowired
  private UserRepository userRepository;
  public void saveUser(RegisterRequest request) {
    User user = new User();
    user.setFirstName(request.getFirstName());
    user.setLastName(request.getLastName());
    user.setEmail(request.getEmail());
    user.setRole(Role.ADMIN);
    user.setCoins(0);
    //TODO: Hash the password here! (Right now it's saving in plain text)
        user.setPassword(request.getPassword());
        userRepository.save(user);
    }
}
