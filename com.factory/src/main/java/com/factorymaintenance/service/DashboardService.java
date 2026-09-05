package com.factorymaintenance.service;

import com.factorymaintenance.entity.Breakdown;
import com.factorymaintenance.entity.MaintenanceRecord;
import com.factorymaintenance.entity.SparePart;
import com.factorymaintenance.repository.BreakdownRepository;
import com.factorymaintenance.repository.MachineRepository;
import com.factorymaintenance.repository.MaintenanceRepository;
import com.factorymaintenance.repository.SparePartRepository;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final MachineRepository machineRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final BreakdownRepository breakdownRepository;
    private final SparePartRepository sparePartRepository;

    public DashboardService(
            MachineRepository machineRepository,
            MaintenanceRepository maintenanceRepository,
            BreakdownRepository breakdownRepository,
            SparePartRepository sparePartRepository
    ) {
        this.machineRepository = machineRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.breakdownRepository = breakdownRepository;
        this.sparePartRepository = sparePartRepository;
    }

    // ==========================================
    // GET DASHBOARD DATA
    // ==========================================

    public Map<String, Object> getDashboardData() {

        Map<String, Object> dashboard = new HashMap<>();

        // ==========================================
        // MACHINE STATISTICS
        // ==========================================

        long totalMachines =
                machineRepository.count();

        long machinesUnderMaintenance =
                machineRepository
                        .findByStatus("MAINTENANCE")
                        .size();

        // ==========================================
        // BREAKDOWN STATISTICS
        // ==========================================

        long openBreakdowns =
                breakdownRepository
                        .findByStatus("OPEN")
                        .size();

        long highPriorityBreakdowns =
                breakdownRepository
                        .findByPriority("HIGH")
                        .size();

        // ==========================================
        // MAINTENANCE STATISTICS
        // ==========================================

        long pendingMaintenance =
                maintenanceRepository
                        .findByStatus("PENDING")
                        .size();

        long completedMaintenance =
                maintenanceRepository
                        .findByStatus("COMPLETED")
                        .size();

        // ==========================================
        // SPARE PART STATISTICS
        // ==========================================

        long totalSpareParts =
                sparePartRepository.count();

        List<SparePart> allSpareParts =
                sparePartRepository.findAll();

        long lowStockParts =
                allSpareParts.stream()
                        .filter(part ->
                                part.getQuantity() <=
                                        part.getMinimumStock()
                        )
                        .count();

        // ==========================================
        // ADD DATA TO DASHBOARD
        // ==========================================

        dashboard.put(
                "totalMachines",
                totalMachines
        );

        dashboard.put(
                "machinesUnderMaintenance",
                machinesUnderMaintenance
        );

        dashboard.put(
                "openBreakdowns",
                openBreakdowns
        );

        dashboard.put(
                "highPriorityBreakdowns",
                highPriorityBreakdowns
        );

        dashboard.put(
                "pendingMaintenance",
                pendingMaintenance
        );

        dashboard.put(
                "completedMaintenance",
                completedMaintenance
        );

        dashboard.put(
                "totalSpareParts",
                totalSpareParts
        );

        dashboard.put(
                "lowStockParts",
                lowStockParts
        );

        return dashboard;
    }
}