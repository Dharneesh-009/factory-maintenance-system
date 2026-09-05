package com.factorymaintenance.service;

import com.factorymaintenance.dto.SparePartRequest;
import com.factorymaintenance.entity.SparePart;
import com.factorymaintenance.exception.ResourceNotFoundException;
import com.factorymaintenance.repository.SparePartRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SparePartService {

    private final SparePartRepository sparePartRepository;

    public SparePartService(
            SparePartRepository sparePartRepository
    ) {
        this.sparePartRepository = sparePartRepository;
    }

    // ==========================================
    // CREATE SPARE PART
    // ==========================================

    public SparePart createSparePart(
            SparePartRequest request
    ) {

        SparePart sparePart = new SparePart();

        sparePart.setName(request.getName());
        sparePart.setPartNumber(request.getPartNumber());
        sparePart.setQuantity(request.getQuantity());
        sparePart.setMinimumStock(request.getMinimumStock());
        sparePart.setLocation(request.getLocation());

        return sparePartRepository.save(sparePart);
    }

    // ==========================================
    // GET ALL SPARE PARTS
    // ==========================================

    public List<SparePart> getAllSpareParts() {

        return sparePartRepository.findAll();
    }

    // ==========================================
    // GET SPARE PART BY ID
    // ==========================================

    public SparePart getSparePartById(Long id) {

        return sparePartRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Spare part not found with id: " + id
                        )
                );
    }

    // ==========================================
    // SEARCH BY NAME
    // ==========================================

    public List<SparePart> searchSpareParts(
            String name
    ) {

        return sparePartRepository
                .findByNameContainingIgnoreCase(name);
    }

    // ==========================================
    // LOW STOCK PARTS
    // ==========================================

    public List<SparePart> getLowStockParts() {

        List<SparePart> allParts =
                sparePartRepository.findAll();

        return allParts.stream()
                .filter(part ->
                        part.getQuantity() <=
                                part.getMinimumStock()
                )
                .toList();
    }

    // ==========================================
    // UPDATE SPARE PART
    // ==========================================

    public SparePart updateSparePart(
            Long id,
            SparePartRequest request
    ) {

        SparePart sparePart =
                getSparePartById(id);

        if (request.getName() != null &&
                !request.getName().isBlank()) {

            sparePart.setName(
                    request.getName()
            );
        }

        if (request.getPartNumber() != null &&
                !request.getPartNumber().isBlank()) {

            sparePart.setPartNumber(
                    request.getPartNumber()
            );
        }

        if (request.getQuantity() != null) {

            sparePart.setQuantity(
                    request.getQuantity()
            );
        }

        if (request.getMinimumStock() != null) {

            sparePart.setMinimumStock(
                    request.getMinimumStock()
            );
        }

        if (request.getLocation() != null &&
                !request.getLocation().isBlank()) {

            sparePart.setLocation(
                    request.getLocation()
            );
        }

        return sparePartRepository.save(sparePart);
    }

    // ==========================================
    // DELETE SPARE PART
    // ==========================================

    public void deleteSparePart(Long id) {

        SparePart sparePart =
                getSparePartById(id);

        sparePartRepository.delete(sparePart);
    }
}