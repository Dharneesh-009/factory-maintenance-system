package com.factorymaintenance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "maintenance_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Machine under maintenance
    @ManyToOne
    @JoinColumn(name = "machine_id", nullable = false)
    private Machine machine;

    // Technician assigned to maintenance
    @ManyToOne
    @JoinColumn(name = "technician_id")
    private User technician;

    // Maintenance date
    @Column(nullable = false)
    private LocalDate maintenanceDate;

    // Maintenance description
    @Column(nullable = false)
    private String description;

    // PENDING / IN_PROGRESS / COMPLETED
    @Column(nullable = false)
    private String status;
}