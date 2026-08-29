package com.factorymaintenance.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MaintenanceRequest {

    private Long machineId;

    private Long technicianId;

    private LocalDate maintenanceDate;

    private String description;

    private String status;
}