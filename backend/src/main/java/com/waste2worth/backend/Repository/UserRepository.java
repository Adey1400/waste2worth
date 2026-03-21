package com.waste2worth.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waste2worth.backend.Entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{
Optional<User> findByEmail(String email);
}
