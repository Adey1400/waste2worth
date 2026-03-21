package com.waste2worth.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waste2worth.backend.Entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

}
