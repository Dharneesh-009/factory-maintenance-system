package com.factorymaintenance.repository;

import com.factorymaintenance.entity.SparePart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SparePartRepository extends JpaRepository<SparePart, Long> {

    List<SparePart> findByNameContainingIgnoreCase(String name);

    List<SparePart> findByQuantityLessThanEqual(Integer minimumStock);

}