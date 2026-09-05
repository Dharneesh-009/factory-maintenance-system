package com.factorymaintenance.controller;

import com.factorymaintenance.dto.SparePartRequest;
import com.factorymaintenance.entity.SparePart;
import com.factorymaintenance.service.SparePartService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spare-parts")
public class SparePartController {

    private final SparePartService sparePartService;

    public SparePartController(
            SparePartService sparePartService
    ) {
        this.sparePartService = sparePartService;
    }

    // ==========================================
    // CREATE SPARE PART
    // POST /api/spare-parts
    // ==========================================

    @PostMapping
    public ResponseEntity<SparePart> createSparePart(
            @RequestBody SparePartRequest request
    ) {

        return ResponseEntity.ok(
                sparePartService.createSparePart(request)
        );
    }

    // ==========================================
    // GET ALL SPARE PARTS
    // GET /api/spare-parts
    // ==========================================

    @GetMapping
    public ResponseEntity<List<SparePart>> getAllSpareParts() {

        return ResponseEntity.ok(
                sparePartService.getAllSpareParts()
        );
    }

    // ==========================================
    // SEARCH SPARE PART
    // GET /api/spare-parts/search?name=bearing
    // ==========================================

    @GetMapping("/search")
    public ResponseEntity<List<SparePart>> searchSpareParts(
            @RequestParam String name
    ) {

        return ResponseEntity.ok(
                sparePartService.searchSpareParts(name)
        );
    }

    // ==========================================
    // LOW STOCK
    // GET /api/spare-parts/low-stock
    // ==========================================

    @GetMapping("/low-stock")
    public ResponseEntity<List<SparePart>> getLowStockParts() {

        return ResponseEntity.ok(
                sparePartService.getLowStockParts()
        );
    }

    // ==========================================
    // GET BY ID
    // GET /api/spare-parts/{id}
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<SparePart> getSparePartById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                sparePartService.getSparePartById(id)
        );
    }

    // ==========================================
    // UPDATE
    // PUT /api/spare-parts/{id}
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<SparePart> updateSparePart(
            @PathVariable Long id,
            @RequestBody SparePartRequest request
    ) {

        return ResponseEntity.ok(
                sparePartService.updateSparePart(
                        id,
                        request
                )
        );
    }

    // ==========================================
    // DELETE
    // DELETE /api/spare-parts/{id}
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSparePart(
            @PathVariable Long id
    ) {

        sparePartService.deleteSparePart(id);

        return ResponseEntity.ok(
                "Spare part deleted successfully"
        );
    }
}