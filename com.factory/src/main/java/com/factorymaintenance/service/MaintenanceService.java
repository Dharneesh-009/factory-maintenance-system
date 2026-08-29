package com.factorymaintenance.service;

import com.factorymaintenance.dto.MaintenanceRequest;
import com.factorymaintenance.entity.Machine;
import com.factorymaintenance.entity.MaintenanceRecord;
import com.factorymaintenance.entity.User;
import com.factorymaintenance.repository.MachineRepository;
import com.factorymaintenance.repository.MaintenanceRepository;
import com.factorymaintenance.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final MachineRepository machineRepository;
    private final UserRepository userRepository;

    public MaintenanceService(
            MaintenanceRepository maintenanceRepository,
            MachineRepository machineRepository,
            UserRepository userRepository
    ) {
        this.maintenanceRepository = maintenanceRepository;
        this.machineRepository = machineRepository;
        this.userRepository = userRepository;
    }

    // ==========================================
    // CREATE MAINTENANCE
    // ==========================================

    public MaintenanceRecord createMaintenance(
            MaintenanceRequest request
    ) {

        Machine machine = machineRepository
                .findById(request.getMachineId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Machine not found"
                        )
                );

        MaintenanceRecord maintenance =
                new MaintenanceRecord();

        maintenance.setMachine(machine);

        // Find technician if provided
        if (request.getTechnicianId() != null) {

            User technician = userRepository
                    .findById(request.getTechnicianId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Technician not found"
                            )
                    );

            maintenance.setTechnician(technician);
        }

        maintenance.setMaintenanceDate(
                request.getMaintenanceDate()
        );

        maintenance.setDescription(
                request.getDescription()
        );

        // Default status
        if (request.getStatus() == null ||
                request.getStatus().isBlank()) {

            maintenance.setStatus("PENDING");

        } else {

            maintenance.setStatus(
                    request.getStatus().toUpperCase()
            );
        }

        return maintenanceRepository.save(maintenance);
    }

    // ==========================================
    // GET ALL
    // ==========================================

    public List<MaintenanceRecord>
    getAllMaintenance() {

        return maintenanceRepository.findAll();
    }

    // ==========================================
    // GET BY ID
    // ==========================================

    public MaintenanceRecord
    getMaintenanceById(Long id) {

        return maintenanceRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Maintenance record not found with id: "
                                        + id
                        )
                );
    }

    // ==========================================
    // UPDATE
    // ==========================================

    public MaintenanceRecord updateMaintenance(
            Long id,
            MaintenanceRequest request
    ) {

        MaintenanceRecord existing =
                getMaintenanceById(id);

        // Update machine
        if (request.getMachineId() != null) {

            Machine machine = machineRepository
                    .findById(request.getMachineId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Machine not found"
                            )
                    );

            existing.setMachine(machine);
        }

        // Update technician
        if (request.getTechnicianId() != null) {

            User technician = userRepository
                    .findById(request.getTechnicianId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Technician not found"
                            )
                    );

            existing.setTechnician(technician);
        }

        if (request.getMaintenanceDate() != null) {

            existing.setMaintenanceDate(
                    request.getMaintenanceDate()
            );
        }

        if (request.getDescription() != null) {

            existing.setDescription(
                    request.getDescription()
            );
        }

        if (request.getStatus() != null) {

            existing.setStatus(
                    request.getStatus().toUpperCase()
            );
        }

        return maintenanceRepository.save(existing);
    }

    // ==========================================
    // DELETE
    // ==========================================

    public void deleteMaintenance(Long id) {

        MaintenanceRecord maintenance =
                getMaintenanceById(id);

        maintenanceRepository.delete(maintenance);
    }

    // ==========================================
    // FILTER BY STATUS
    // ==========================================

    public List<MaintenanceRecord>
    getMaintenanceByStatus(String status) {

        return maintenanceRepository
                .findByStatus(status.toUpperCase());
    }

    // ==========================================
    // GET BY MACHINE
    // ==========================================

    public List<MaintenanceRecord>
    getMaintenanceByMachine(Long machineId) {

        return maintenanceRepository
                .findByMachineId(machineId);
    }

    // ==========================================
    // GET BY TECHNICIAN
    // ==========================================

    public List<MaintenanceRecord>
    getMaintenanceByTechnician(Long technicianId) {

        return maintenanceRepository
                .findByTechnicianId(technicianId);
    }
}