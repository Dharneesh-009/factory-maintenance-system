package com.factorymaintenance.controller;

import com.factorymaintenance.entity.Machine;
import com.factorymaintenance.service.MachineService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
public class MachineController {

    private final MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    // =========================
    // CREATE MACHINE
    // POST /api/machines
    // =========================
    @PostMapping
    public ResponseEntity<Machine> createMachine(
            @RequestBody Machine machine
    ) {
        return ResponseEntity.ok(
                machineService.createMachine(machine)
        );
    }

    // =========================
    // GET ALL MACHINES
    // GET /api/machines
    // =========================
    @GetMapping
    public ResponseEntity<List<Machine>> getAllMachines() {
        return ResponseEntity.ok(
                machineService.getAllMachines()
        );
    }

    // =========================
    // FILTER BY STATUS
    // GET /api/machines/status/{status}
    // =========================
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Machine>> getMachinesByStatus(
            @PathVariable String status
    ) {
        return ResponseEntity.ok(
                machineService.getMachinesByStatus(status)
        );
    }

    // =========================
    // SEARCH BY NAME
    // GET /api/machines/search?name=CNC
    // =========================
    @GetMapping("/search")
    public ResponseEntity<List<Machine>> searchMachines(
            @RequestParam String name
    ) {
        return ResponseEntity.ok(
                machineService.searchMachines(name)
        );
    }

    // =========================
    // GET MACHINE BY ID
    // GET /api/machines/{id}
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Machine> getMachineById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                machineService.getMachineById(id)
        );
    }

    // =========================
    // UPDATE MACHINE
    // PUT /api/machines/{id}
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Machine> updateMachine(
            @PathVariable Long id,
            @RequestBody Machine machine
    ) {
        return ResponseEntity.ok(
                machineService.updateMachine(id, machine)
        );
    }

    // =========================
    // DELETE MACHINE
    // DELETE /api/machines/{id}
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMachine(
            @PathVariable Long id
    ) {
        machineService.deleteMachine(id);

        return ResponseEntity.ok(
                "Machine deleted successfully"
        );
    }
}