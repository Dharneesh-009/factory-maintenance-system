package com.factorymaintenance.controller;

import com.factorymaintenance.dto.MaintenanceRequest;
import com.factorymaintenance.dto.MaintenanceResponse;
import com.factorymaintenance.service.MaintenanceService;
import com.factorymaintenance.dto.TechnicianResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(
            MaintenanceService maintenanceService
    ) {
        this.maintenanceService = maintenanceService;
    }

    // =========================================
    // CREATE MAINTENANCE
    // =========================================

    @PostMapping
    public ResponseEntity<MaintenanceResponse> createMaintenance(
            @RequestBody MaintenanceRequest request
    ) {
        return ResponseEntity.ok(
                maintenanceService.createMaintenance(request)
        );
    }


    // =========================================
    // GET ALL MAINTENANCE
    // =========================================

    @GetMapping
    public ResponseEntity<List<MaintenanceResponse>> getAllMaintenance() {

        return ResponseEntity.ok(
                maintenanceService.getAllMaintenance()
        );
    }


    // =========================================
    // GET MAINTENANCE BY STATUS
    // =========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MaintenanceResponse>> getMaintenanceByStatus(
            @PathVariable String status
    ) {

        return ResponseEntity.ok(
                maintenanceService.getMaintenanceByStatus(status)
        );
    }


    // =========================================
    // GET MAINTENANCE BY MACHINE
    // =========================================

    @GetMapping("/machine/{machineId}")
    public ResponseEntity<List<MaintenanceResponse>> getMaintenanceByMachine(
            @PathVariable Long machineId
    ) {

        return ResponseEntity.ok(
                maintenanceService.getMaintenanceByMachine(machineId)
        );
    }


    // =========================================
    // GET MAINTENANCE BY TECHNICIAN
    // =========================================

    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<MaintenanceResponse>> getMaintenanceByTechnician(
            @PathVariable Long technicianId
    ) {

        return ResponseEntity.ok(
                maintenanceService.getMaintenanceByTechnician(technicianId)
        );
    }


    // =========================================
    // GET MAINTENANCE BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceResponse> getMaintenanceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                maintenanceService.getMaintenanceById(id)
        );
    }


    // =========================================
    // UPDATE MAINTENANCE
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceResponse> updateMaintenance(
            @PathVariable Long id,
            @RequestBody MaintenanceRequest request
    ) {

        return ResponseEntity.ok(
                maintenanceService.updateMaintenance(id, request)
        );
    }


    // =========================================
    // UPDATE MAINTENANCE STATUS
    // =========================================

    @PatchMapping("/{id}/status")
    public ResponseEntity<MaintenanceResponse> updateMaintenanceStatus(
            @PathVariable Long id,
            @RequestBody MaintenanceRequest request
    ) {
        return ResponseEntity.ok(
                maintenanceService.updateMaintenanceStatus(
                        id,
                        request.getStatus()
                )
        );
    }

    // =========================================
    // DELETE MAINTENANCE
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMaintenance(
            @PathVariable Long id
    ) {

        maintenanceService.deleteMaintenance(id);

        return ResponseEntity.ok(
                "Maintenance deleted successfully"
        );
    }

    // =========================================
// GET ALL TECHNICIANS
// =========================================

    @GetMapping("/technicians")
    public ResponseEntity<List<TechnicianResponse>> getAllTechnicians() {

        return ResponseEntity.ok(
                maintenanceService.getAllTechnicians()
        );
    }

}