package com.api.seaport.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.api.seaport.dto.ReportContainerSumpDto;
import com.api.seaport.model.ContainerModel;
import com.api.seaport.repository.ContainerCustomRepository;
import com.api.seaport.repository.ContainerRepositoryInterface;

import jakarta.transaction.Transactional;

@Service
public class ContainerService {
    final ContainerRepositoryInterface repository;
    final ContainerCustomRepository customRepository;

    ContainerService(ContainerRepositoryInterface repository, ContainerCustomRepository customRepository) {
        this.repository = repository;
        this.customRepository = customRepository;
    }

    @Transactional
    public ContainerModel save(ContainerModel containerModel) {
        return repository.save(containerModel);
    }

    public List<ContainerModel> findAll() {
        return repository.findAll();
    }

    public Optional<ContainerModel> findById(@RequestParam("id") UUID id) {
        return repository.findById(id);
    }

    public boolean existsByNumberContainer(String numberContainer) {
        return repository.existsByNumberContainer(numberContainer);
    }    

    public List<ContainerModel> listContainersByFilter(String client, String numberContainer, Integer type,
    String status, String category) {
        var response = repository.listContainersByFilter(client, numberContainer, type, status, category);

        return response;
    }

    public List<ReportContainerSumpDto> listContainerReport() {
        return this.customRepository.listContainerReport();
    } 

    @Transactional
    public void delete(ContainerModel containerModel) {
        this.repository.delete(containerModel);
    }
}
