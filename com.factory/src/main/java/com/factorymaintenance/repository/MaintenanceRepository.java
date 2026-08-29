package com.factorymaintenance.repository;

import com.factorymaintenance.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRepository
        extends JpaRepository<MaintenanceRecord, Long> {

    List<MaintenanceRecord> findByStatus(String status);

    List<MaintenanceRecord> findByTechnicianId(Long technicianId);

    List<MaintenanceRecord> findByMachineId(Long machineId);
}