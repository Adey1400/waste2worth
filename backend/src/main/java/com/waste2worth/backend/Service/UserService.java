package com.waste2worth.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.waste2worth.backend.Entity.User;
import com.waste2worth.backend.Repository.UserRepository;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  public UserService(UserRepository userRepository){
    this.userRepository= userRepository;
  }
  public User saveUser(User user) {
     return userRepository.save(user);
    }
}
