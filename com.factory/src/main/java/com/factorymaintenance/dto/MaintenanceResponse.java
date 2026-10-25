package com.factorymaintenance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceResponse {

    private Long id;

    private Long machineId;
    private String machineName;
    private String machineModel;
    private String machineSerialNumber;
    private String machineLocation;
    private String machineStatus;

    private Long technicianId;
    private String technicianName;
    private String technicianEmail;

    private LocalDate maintenanceDate;

    private String description;

    private String status;
}