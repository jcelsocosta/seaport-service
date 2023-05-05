package com.api.seaport.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.api.seaport.dto.ReportMovementDto;
import com.api.seaport.model.MovementModel;
import com.api.seaport.repository.MovementCustomRepository;
import com.api.seaport.repository.MovementRepositoryInterface;

import jakarta.transaction.Transactional;

@Service
public class MovementService {
    final MovementRepositoryInterface repository;
    final MovementCustomRepository customRepository;

    public MovementService(MovementRepositoryInterface repository, MovementCustomRepository customRepository) {
        this.repository = repository;
        this.customRepository = customRepository;
    }

    @Transactional
    public MovementModel save(MovementModel movementModel) {
        return repository.save(movementModel);
    }

    public List<MovementModel> findAll() {
        return repository.findAll();
    }

    public Optional<MovementModel> findById(@RequestParam("id") UUID id) {
        return repository.findById(id);
    }    

    public List<MovementModel> listMovementsByFilter(String type, String dateInitial,
    String dateFinal, String containerID) {
        var response = repository.listMovementsByFilter(type, dateInitial, dateFinal, containerID);

        return response;
    }

    @Transactional
    public void delete(MovementModel MovementModel) {
        this.repository.delete(MovementModel);
    }

    public List<ReportMovementDto> listMovementReport() {
        return this.customRepository.listMovementReport();
    }
}
