package com.factorymaintenance.service;

import com.factorymaintenance.entity.Breakdown;
import com.factorymaintenance.entity.MaintenanceRecord;
import com.factorymaintenance.entity.Machine;
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
public class ReportService {

    private final MachineRepository machineRepository;
    private final MaintenanceRepository maintenanceRepository;
    private final BreakdownRepository breakdownRepository;
    private final SparePartRepository sparePartRepository;

    public ReportService(
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
    // MACHINE REPORT
    // ==========================================

    public Map<String, Object> getMachineReport() {

        Map<String, Object> report = new HashMap<>();

        List<Machine> machines =
                machineRepository.findAll();

        long total =
                machines.size();

        long running =
                machines.stream()
                        .filter(machine ->
                                "RUNNING".equalsIgnoreCase(
                                        machine.getStatus()
                                )
                        )
                        .count();

        long stopped =
                machines.stream()
                        .filter(machine ->
                                "STOPPED".equalsIgnoreCase(
                                        machine.getStatus()
                                )
                        )
                        .count();

        long maintenance =
                machines.stream()
                        .filter(machine ->
                                "MAINTENANCE".equalsIgnoreCase(
                                        machine.getStatus()
                                )
                        )
                        .count();

        report.put("total", total);
        report.put("running", running);
        report.put("stopped", stopped);
        report.put("maintenance", maintenance);

        return report;
    }

    // ==========================================
    // MAINTENANCE REPORT
    // ==========================================

    public Map<String, Object> getMaintenanceReport() {

        Map<String, Object> report = new HashMap<>();

        List<MaintenanceRecord> records =
                maintenanceRepository.findAll();

        long total =
                records.size();

        long pending =
                records.stream()
                        .filter(record ->
                                "PENDING".equalsIgnoreCase(
                                        record.getStatus()
                                )
                        )
                        .count();

        long inProgress =
                records.stream()
                        .filter(record ->
                                "IN_PROGRESS".equalsIgnoreCase(
                                        record.getStatus()
                                )
                        )
                        .count();

        long completed =
                records.stream()
                        .filter(record ->
                                "COMPLETED".equalsIgnoreCase(
                                        record.getStatus()
                                )
                        )
                        .count();

        report.put("total", total);
        report.put("pending", pending);
        report.put("inProgress", inProgress);
        report.put("completed", completed);

        return report;
    }

    // ==========================================
    // BREAKDOWN REPORT
    // ==========================================

    public Map<String, Object> getBreakdownReport() {

        Map<String, Object> report = new HashMap<>();

        List<Breakdown> breakdowns =
                breakdownRepository.findAll();

        long total =
                breakdowns.size();

        long open =
                breakdowns.stream()
                        .filter(breakdown ->
                                "OPEN".equalsIgnoreCase(
                                        breakdown.getStatus()
                                )
                        )
                        .count();

        long inProgress =
                breakdowns.stream()
                        .filter(breakdown ->
                                "IN_PROGRESS".equalsIgnoreCase(
                                        breakdown.getStatus()
                                )
                        )
                        .count();

        long resolved =
                breakdowns.stream()
                        .filter(breakdown ->
                                "RESOLVED".equalsIgnoreCase(
                                        breakdown.getStatus()
                                )
                        )
                        .count();

        long high =
                breakdowns.stream()
                        .filter(breakdown ->
                                "HIGH".equalsIgnoreCase(
                                        breakdown.getPriority()
                                )
                        )
                        .count();

        long medium =
                breakdowns.stream()
                        .filter(breakdown ->
                                "MEDIUM".equalsIgnoreCase(
                                        breakdown.getPriority()
                                )
                        )
                        .count();

        long low =
                breakdowns.stream()
                        .filter(breakdown ->
                                "LOW".equalsIgnoreCase(
                                        breakdown.getPriority()
                                )
                        )
                        .count();

        report.put("total", total);

        report.put("open", open);
        report.put("inProgress", inProgress);
        report.put("resolved", resolved);

        report.put("highPriority", high);
        report.put("mediumPriority", medium);
        report.put("lowPriority", low);

        return report;
    }

    // ==========================================
    // SPARE PART REPORT
    // ==========================================

    public Map<String, Object> getSparePartReport() {

        Map<String, Object> report = new HashMap<>();

        List<SparePart> parts =
                sparePartRepository.findAll();

        long total =
                parts.size();

        long lowStock =
                parts.stream()
                        .filter(part ->
                                part.getQuantity() <=
                                        part.getMinimumStock()
                        )
                        .count();

        long sufficientStock =
                parts.stream()
                        .filter(part ->
                                part.getQuantity() >
                                        part.getMinimumStock()
                        )
                        .count();

        int totalQuantity =
                parts.stream()
                        .mapToInt(SparePart::getQuantity)
                        .sum();

        report.put("totalParts", total);
        report.put("lowStockParts", lowStock);
        report.put("sufficientStockParts", sufficientStock);
        report.put("totalQuantity", totalQuantity);

        return report;
    }
}