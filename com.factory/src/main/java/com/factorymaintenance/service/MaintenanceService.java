
package com.factorymaintenance.service;

import com.factorymaintenance.dto.MaintenanceRequest;
import com.factorymaintenance.dto.MaintenanceResponse;
import com.factorymaintenance.entity.Machine;
import com.factorymaintenance.entity.MaintenanceRecord;
import com.factorymaintenance.entity.User;
import com.factorymaintenance.exception.ResourceNotFoundException;
import com.factorymaintenance.repository.MachineRepository;
import com.factorymaintenance.repository.MaintenanceRepository;
import com.factorymaintenance.repository.UserRepository;
import com.factorymaintenance.dto.TechnicianResponse;
import java.util.stream.Collectors;
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

    // Convert entity to a safe response DTO
    private MaintenanceResponse convertToResponse(
            MaintenanceRecord maintenance
    ) {
        MaintenanceResponse response = new MaintenanceResponse();

        response.setId(maintenance.getId());

        Machine machine = maintenance.getMachine();

        if (machine != null) {
            response.setMachineId(machine.getId());
            response.setMachineName(machine.getName());
            response.setMachineModel(machine.getModel());
            response.setMachineSerialNumber(machine.getSerialNumber());
            response.setMachineLocation(machine.getLocation());
            response.setMachineStatus(machine.getStatus());
        }

        User technician = maintenance.getTechnician();

        if (technician != null) {
            response.setTechnicianId(technician.getId());
            response.setTechnicianName(technician.getName());
            response.setTechnicianEmail(technician.getEmail());
        }

        response.setMaintenanceDate(maintenance.getMaintenanceDate());
        response.setDescription(maintenance.getDescription());
        response.setStatus(maintenance.getStatus());

        return response;
    }

    // Create maintenance
    public MaintenanceResponse createMaintenance(
            MaintenanceRequest request
    ) {
        Machine machine = machineRepository
                .findById(request.getMachineId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Machine not found with id: "
                                        + request.getMachineId()
                        )
                );

        MaintenanceRecord maintenance = new MaintenanceRecord();
        maintenance.setMachine(machine);

        if (request.getTechnicianId() != null) {
            User technician = userRepository
                    .findById(request.getTechnicianId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Technician not found with id: "
                                            + request.getTechnicianId()
                            )
                    );

            maintenance.setTechnician(technician);
        }

        maintenance.setMaintenanceDate(request.getMaintenanceDate());
        maintenance.setDescription(request.getDescription());

        String status = request.getStatus();

        if (status == null || status.isBlank()) {
            maintenance.setStatus("PENDING");
        } else {
            maintenance.setStatus(status.trim().toUpperCase());
        }

        MaintenanceRecord saved = maintenanceRepository.save(maintenance);

        return convertToResponse(saved);
    }

    // Get all maintenance records
    public List<MaintenanceResponse> getAllMaintenance() {
        return maintenanceRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Get one maintenance record by ID
    public MaintenanceResponse getMaintenanceById(Long id) {
        return convertToResponse(getMaintenanceEntityById(id));
    }

    // Update maintenance
    public MaintenanceResponse updateMaintenance(
            Long id,
            MaintenanceRequest request
    ) {
        MaintenanceRecord existing = getMaintenanceEntityById(id);

        if (request.getMachineId() != null) {
            Machine machine = machineRepository
                    .findById(request.getMachineId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Machine not found with id: "
                                            + request.getMachineId()
                            )
                    );

            existing.setMachine(machine);
        }

        if (request.getTechnicianId() != null) {
            User technician = userRepository
                    .findById(request.getTechnicianId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Technician not found with id: "
                                            + request.getTechnicianId()
                            )
                    );

            existing.setTechnician(technician);
        }

        if (request.getMaintenanceDate() != null) {
            existing.setMaintenanceDate(request.getMaintenanceDate());
        }

        if (request.getDescription() != null) {
            existing.setDescription(request.getDescription());
        }

        if (request.getStatus() != null
                && !request.getStatus().isBlank()) {
            existing.setStatus(request.getStatus().trim().toUpperCase());
        }

        MaintenanceRecord saved = maintenanceRepository.save(existing);

        return convertToResponse(saved);
    }


    // Update maintenance status only
    public MaintenanceResponse updateMaintenanceStatus(
            Long id,
            String status
    ) {
        MaintenanceRecord existing = getMaintenanceEntityById(id);

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException(
                    "Maintenance status is required."
            );
        }

        String normalizedStatus = status.trim().toUpperCase();

        if (!List.of("PENDING", "IN_PROGRESS", "COMPLETED")
                .contains(normalizedStatus)) {
            throw new IllegalArgumentException(
                    "Invalid status. Allowed values: PENDING, IN_PROGRESS, COMPLETED."
            );
        }

        existing.setStatus(normalizedStatus);

        MaintenanceRecord saved = maintenanceRepository.save(existing);

        return convertToResponse(saved);
    }

    // Find a maintenance entity or return 404
    private MaintenanceRecord getMaintenanceEntityById(Long id) {
        return maintenanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Maintenance record not found with id: " + id
                        )
                );
    }

    // Delete maintenance
    public void deleteMaintenance(Long id) {
        MaintenanceRecord maintenance = getMaintenanceEntityById(id);
        maintenanceRepository.delete(maintenance);
    }

    // Filter by status
    public List<MaintenanceResponse> getMaintenanceByStatus(String status) {
        return maintenanceRepository.findByStatus(status.trim().toUpperCase())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Filter by machine
    public List<MaintenanceResponse> getMaintenanceByMachine(Long machineId) {
        return maintenanceRepository.findByMachineId(machineId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Filter by technician
    public List<MaintenanceResponse> getMaintenanceByTechnician(
            Long technicianId
    ) {
        return maintenanceRepository.findByTechnicianId(technicianId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Get all technicians for the maintenance dropdown
    public List<TechnicianResponse> getAllTechnicians() {

        return userRepository.findByRoleIgnoreCase("TECHNICIAN")
                .stream()
                .map(user -> new TechnicianResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .collect(Collectors.toList());
    }

}