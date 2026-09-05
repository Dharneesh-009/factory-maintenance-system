package com.factorymaintenance.controller;

import com.factorymaintenance.service.DashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    // ==========================================
    // GET DASHBOARD
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    public ResponseEntity<Map<String, Object>> getDashboard() {

        return ResponseEntity.ok(
                dashboardService.getDashboardData()
        );
    }
}