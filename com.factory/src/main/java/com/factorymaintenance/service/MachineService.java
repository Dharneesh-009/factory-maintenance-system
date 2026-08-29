package com.factorymaintenance.service;

import com.factorymaintenance.entity.Machine;
import com.factorymaintenance.repository.MachineRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MachineService {

    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    // Add machine
    public Machine createMachine(Machine machine) {

        if (machineRepository.existsBySerialNumber(
                machine.getSerialNumber())) {

            throw new RuntimeException(
                    "Machine with this serial number already exists"
            );
        }

        if (machine.getStatus() == null ||
                machine.getStatus().isBlank()) {

            machine.setStatus("RUNNING");
        }

        return machineRepository.save(machine);
    }

    // Get all machines
    public List<Machine> getAllMachines() {

        return machineRepository.findAll();
    }

    // Get machine by ID
    public Machine getMachineById(Long id) {

        return machineRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Machine not found with id: " + id
                        )
                );
    }

    // Update machine
    public Machine updateMachine(
            Long id,
            Machine updatedMachine
    ) {

        Machine existingMachine =
                getMachineById(id);

        existingMachine.setName(
                updatedMachine.getName()
        );

        existingMachine.setModel(
                updatedMachine.getModel()
        );

        existingMachine.setSerialNumber(
                updatedMachine.getSerialNumber()
        );

        existingMachine.setLocation(
                updatedMachine.getLocation()
        );

        existingMachine.setStatus(
                updatedMachine.getStatus()
        );

        return machineRepository.save(existingMachine);
    }

    // Delete machine
    public void deleteMachine(Long id) {

        Machine machine =
                getMachineById(id);

        machineRepository.delete(machine);
    }

    // Filter by status
    public List<Machine> getMachinesByStatus(
            String status
    ) {

        return machineRepository.findByStatus(
                status.toUpperCase()
        );
    }

    // Search by machine name
    public List<Machine> searchMachines(
            String name
    ) {

        return machineRepository
                .findByNameContainingIgnoreCase(name);
    }
}