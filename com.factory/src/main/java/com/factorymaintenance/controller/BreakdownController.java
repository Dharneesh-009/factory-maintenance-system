package com.factorymaintenance.controller;

import com.factorymaintenance.dto.BreakdownRequest;
import com.factorymaintenance.entity.Breakdown;
import com.factorymaintenance.service.BreakdownService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breakdowns")
public class BreakdownController {

    private final BreakdownService breakdownService;

    public BreakdownController(BreakdownService breakdownService) {
        this.breakdownService = breakdownService;
    }

    // =========================
    // CREATE BREAKDOWN
    // ADMIN + TECHNICIAN
    // =========================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<Breakdown> createBreakdown(
            @RequestBody BreakdownRequest request
    ) {

        return ResponseEntity.ok(
                breakdownService.createBreakdown(request)
        );
    }

    // =========================
    // GET ALL BREAKDOWNS
    // ADMIN + TECHNICIAN
    // =========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<Breakdown>> getAllBreakdowns() {

        return ResponseEntity.ok(
                breakdownService.getAllBreakdowns()
        );
    }

    // =========================
    // GET BY STATUS
    // =========================

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<Breakdown>> getBreakdownsByStatus(
            @PathVariable String status
    ) {

        return ResponseEntity.ok(
                breakdownService.getBreakdownsByStatus(status)
        );
    }

    // =========================
    // GET BY PRIORITY
    // =========================

    @GetMapping("/priority/{priority}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<Breakdown>> getBreakdownsByPriority(
            @PathVariable String priority
    ) {

        return ResponseEntity.ok(
                breakdownService.getBreakdownsByPriority(priority)
        );
    }

    // =========================
    // GET BY MACHINE
    // =========================

    @GetMapping("/machine/{machineId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<Breakdown>> getBreakdownsByMachine(
            @PathVariable Long machineId
    ) {

        return ResponseEntity.ok(
                breakdownService.getBreakdownsByMachine(machineId)
        );
    }

    // =========================
    // GET BY TECHNICIAN
    // =========================

    @GetMapping("/technician/{technicianId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<List<Breakdown>> getBreakdownsByTechnician(
            @PathVariable Long technicianId
    ) {

        return ResponseEntity.ok(
                breakdownService.getBreakdownsByTechnician(technicianId)
        );
    }

    // =========================
    // GET BY ID
    // =========================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<Breakdown> getBreakdownById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                breakdownService.getBreakdownById(id)
        );
    }

    // =========================
    // UPDATE BREAKDOWN
    // ADMIN + TECHNICIAN
    // =========================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<Breakdown> updateBreakdown(
            @PathVariable Long id,
            @RequestBody BreakdownRequest request
    ) {

        return ResponseEntity.ok(
                breakdownService.updateBreakdown(id, request)
        );
    }

    // =========================
    // DELETE BREAKDOWN
    // ADMIN ONLY
    // =========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBreakdown(
            @PathVariable Long id
    ) {

        breakdownService.deleteBreakdown(id);

        return ResponseEntity.ok(
                "Breakdown deleted successfully"
        );
    }
}