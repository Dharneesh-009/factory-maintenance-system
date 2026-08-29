package com.factorymaintenance.repository;

import com.factorymaintenance.entity.Machine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MachineRepository extends JpaRepository<Machine, Long> {

    List<Machine> findByStatus(String status);

    List<Machine> findByNameContainingIgnoreCase(String name);

    boolean existsBySerialNumber(String serialNumber);
}