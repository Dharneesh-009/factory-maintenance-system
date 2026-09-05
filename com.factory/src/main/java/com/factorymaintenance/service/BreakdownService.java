package com.factorymaintenance.service;

import com.factorymaintenance.dto.BreakdownRequest;
import com.factorymaintenance.entity.Breakdown;
import com.factorymaintenance.entity.Machine;
import com.factorymaintenance.entity.User;
import com.factorymaintenance.exception.ResourceNotFoundException;
import com.factorymaintenance.repository.BreakdownRepository;
import com.factorymaintenance.repository.MachineRepository;
import com.factorymaintenance.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BreakdownService {

    private final BreakdownRepository breakdownRepository;
    private final MachineRepository machineRepository;
    private final UserRepository userRepository;

    public BreakdownService(
            BreakdownRepository breakdownRepository,
            MachineRepository machineRepository,
            UserRepository userRepository
    ) {
        this.breakdownRepository = breakdownRepository;
        this.machineRepository = machineRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // CREATE BREAKDOWN
    // =========================

    public Breakdown createBreakdown(BreakdownRequest request) {

        Machine machine = machineRepository.findById(request.getMachineId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Machine not found")
                );

        Breakdown breakdown = new Breakdown();

        breakdown.setMachine(machine);
        breakdown.setDescription(request.getDescription());

        // Default priority
        if (request.getPriority() == null ||
                request.getPriority().isBlank()) {

            breakdown.setPriority("MEDIUM");

        } else {
            breakdown.setPriority(request.getPriority().toUpperCase());
        }

        // Default status
        if (request.getStatus() == null ||
                request.getStatus().isBlank()) {

            breakdown.setStatus("OPEN");

        } else {
            breakdown.setStatus(request.getStatus().toUpperCase());
        }

        // Assign technician if provided
        if (request.getTechnicianId() != null) {

            User technician = userRepository.findById(
                    request.getTechnicianId()
            ).orElseThrow(() ->
                    new ResourceNotFoundException("Technician not found")
            );

            breakdown.setTechnician(technician);
        }

        breakdown.setReportedDate(LocalDateTime.now());

        return breakdownRepository.save(breakdown);
    }

    // =========================
    // GET ALL BREAKDOWNS
    // =========================

    public List<Breakdown> getAllBreakdowns() {
        return breakdownRepository.findAll();
    }

    // =========================
    // GET BREAKDOWN BY ID
    // =========================

    public Breakdown getBreakdownById(Long id) {

        return breakdownRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Breakdown not found with id: " + id
                        )
                );
    }

    // =========================
    // GET BY STATUS
    // =========================

    public List<Breakdown> getBreakdownsByStatus(String status) {

        return breakdownRepository.findByStatus(
                status.toUpperCase()
        );
    }

    // =========================
    // GET BY PRIORITY
    // =========================

    public List<Breakdown> getBreakdownsByPriority(String priority) {

        return breakdownRepository.findByPriority(
                priority.toUpperCase()
        );
    }

    // =========================
    // GET BY MACHINE
    // =========================

    public List<Breakdown> getBreakdownsByMachine(Long machineId) {

        return breakdownRepository.findByMachineId(machineId);
    }

    // =========================
    // GET BY TECHNICIAN
    // =========================

    public List<Breakdown> getBreakdownsByTechnician(Long technicianId) {

        return breakdownRepository.findByTechnicianId(technicianId);
    }

    // =========================
    // UPDATE BREAKDOWN
    // =========================

    public Breakdown updateBreakdown(
            Long id,
            BreakdownRequest request
    ) {

        Breakdown breakdown = getBreakdownById(id);

        // Update machine
        if (request.getMachineId() != null) {

            Machine machine = machineRepository.findById(
                    request.getMachineId()
            ).orElseThrow(() ->
                    new ResourceNotFoundException("Machine not found")
            );

            breakdown.setMachine(machine);
        }

        // Update technician
        if (request.getTechnicianId() != null) {

            User technician = userRepository.findById(
                    request.getTechnicianId()
            ).orElseThrow(() ->
                    new ResourceNotFoundException("Technician not found")
            );

            breakdown.setTechnician(technician);
        }

        // Update description
        if (request.getDescription() != null &&
                !request.getDescription().isBlank()) {

            breakdown.setDescription(request.getDescription());
        }

        // Update priority
        if (request.getPriority() != null &&
                !request.getPriority().isBlank()) {

            breakdown.setPriority(
                    request.getPriority().toUpperCase()
            );
        }

        // Update status
        if (request.getStatus() != null &&
                !request.getStatus().isBlank()) {

            breakdown.setStatus(
                    request.getStatus().toUpperCase()
            );
        }

        return breakdownRepository.save(breakdown);
    }

    // =========================
    // DELETE BREAKDOWN
    // =========================

    public void deleteBreakdown(Long id) {

        Breakdown breakdown = getBreakdownById(id);

        breakdownRepository.delete(breakdown);
    }
}