package com.waste2worth.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waste2worth.backend.Entity.Pickup;

public interface PickupRepository extends JpaRepository<Pickup,Integer>{
    // "SELECT * FROM pickup INNER JOIN users ON pickup.user_id = users.id WHERE users.email = ?"
List<Pickup> findByUserEmail(String email);
}
