package com.factorymaintenance.controller;

import com.factorymaintenance.service.ReportService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(
            ReportService reportService
    ) {
        this.reportService = reportService;
    }

    // ==========================================
    // MACHINE REPORT
    // ==========================================

    @GetMapping("/machines")
    public ResponseEntity<Map<String, Object>> getMachineReport() {

        return ResponseEntity.ok(
                reportService.getMachineReport()
        );
    }

    // ==========================================
    // MAINTENANCE REPORT
    // ==========================================

    @GetMapping("/maintenance")
    public ResponseEntity<Map<String, Object>> getMaintenanceReport() {

        return ResponseEntity.ok(
                reportService.getMaintenanceReport()
        );
    }

    // ==========================================
    // BREAKDOWN REPORT
    // ==========================================

    @GetMapping("/breakdowns")
    public ResponseEntity<Map<String, Object>> getBreakdownReport() {

        return ResponseEntity.ok(
                reportService.getBreakdownReport()
        );
    }

    // ==========================================
    // SPARE PART REPORT
    // ==========================================

    @GetMapping("/spare-parts")
    public ResponseEntity<Map<String, Object>> getSparePartReport() {

        return ResponseEntity.ok(
                reportService.getSparePartReport()
        );
    }
}