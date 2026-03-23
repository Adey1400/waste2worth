package com.waste2worth.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.waste2worth.backend.Entity.Waste;

public interface WasteRepository extends JpaRepository<Waste,Integer>{

}
