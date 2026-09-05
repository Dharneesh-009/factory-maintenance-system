package com.factorymaintenance.repository;

import com.factorymaintenance.entity.Breakdown;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BreakdownRepository extends JpaRepository<Breakdown, Long> {

    List<Breakdown> findByStatus(String status);

    List<Breakdown> findByPriority(String priority);

    List<Breakdown> findByMachineId(Long machineId);

    List<Breakdown> findByTechnicianId(Long technicianId);
}