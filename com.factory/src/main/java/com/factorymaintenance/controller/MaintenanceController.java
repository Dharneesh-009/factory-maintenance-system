package com.factorymaintenance.controller;

import com.factorymaintenance.dto.MaintenanceRequest;
import com.factorymaintenance.entity.MaintenanceRecord;
import com.factorymaintenance.service.MaintenanceService;

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

    // ==========================================
    // CREATE
    // POST /api/maintenance
    // ==========================================

    @PostMapping
    public ResponseEntity<MaintenanceRecord>
    createMaintenance(
            @RequestBody MaintenanceRequest request
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .createMaintenance(request)
        );
    }

    // ==========================================
    // GET ALL
    // GET /api/maintenance
    // ==========================================

    @GetMapping
    public ResponseEntity<List<MaintenanceRecord>>
    getAllMaintenance() {

        return ResponseEntity.ok(
                maintenanceService
                        .getAllMaintenance()
        );
    }

    // ==========================================
    // FILTER BY STATUS
    // GET /api/maintenance/status/{status}
    // ==========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MaintenanceRecord>>
    getMaintenanceByStatus(
            @PathVariable String status
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .getMaintenanceByStatus(status)
        );
    }

    // ==========================================
    // GET BY MACHINE
    // GET /api/maintenance/machine/{machineId}
    // ==========================================

    @GetMapping("/machine/{machineId}")
    public ResponseEntity<List<MaintenanceRecord>>
    getMaintenanceByMachine(
            @PathVariable Long machineId
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .getMaintenanceByMachine(machineId)
        );
    }

    // ==========================================
    // GET BY TECHNICIAN
    // GET /api/maintenance/technician/{technicianId}
    // ==========================================

    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<MaintenanceRecord>>
    getMaintenanceByTechnician(
            @PathVariable Long technicianId
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .getMaintenanceByTechnician(
                                technicianId
                        )
        );
    }

    // ==========================================
    // GET BY ID
    // GET /api/maintenance/{id}
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecord>
    getMaintenanceById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .getMaintenanceById(id)
        );
    }

    // ==========================================
    // UPDATE
    // PUT /api/maintenance/{id}
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<MaintenanceRecord>
    updateMaintenance(
            @PathVariable Long id,
            @RequestBody MaintenanceRequest request
    ) {

        return ResponseEntity.ok(
                maintenanceService
                        .updateMaintenance(
                                id,
                                request
                        )
        );
    }

    // ==========================================
    // DELETE
    // DELETE /api/maintenance/{id}
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deleteMaintenance(
            @PathVariable Long id
    ) {

        maintenanceService.deleteMaintenance(id);

        return ResponseEntity.ok(
                "Maintenance deleted successfully"
        );
    }
}