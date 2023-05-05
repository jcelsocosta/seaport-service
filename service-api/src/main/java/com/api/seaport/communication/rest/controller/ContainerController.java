package com.api.seaport.communication.rest.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.seaport.dto.ContainerDto;
import com.api.seaport.dto.ReportContainerSumpDto;
import com.api.seaport.model.ContainerModel;
import com.api.seaport.service.ContainerService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/container")
public class ContainerController {

    @Autowired
    final ContainerService containerService;

    public ContainerController(ContainerService containerService) {
        this.containerService = containerService;
    }

    @PostMapping
    public ResponseEntity<Object> saveContainer(@RequestBody @Valid ContainerDto containerDto) {
        if (containerService.existsByNumberContainer(containerDto.getNumberContainer())) {
           return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: O número do contêiner já está cadastrado."); 
        }
        var containerModel = new ContainerModel();
        BeanUtils.copyProperties(containerDto, containerModel);
        containerModel.setCreatedAt(LocalDateTime.now(ZoneId.of("UTC")));
        containerModel.setUpdatedAt(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.CREATED).body(containerService.save(containerModel));
    }

    @GetMapping
    public ResponseEntity<List<ContainerModel>> getAllContainers() {
        return ResponseEntity.status(HttpStatus.OK).body(containerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneContainer(@PathVariable(value = "id") UUID id) {
        Optional<ContainerModel> containerModelOptional = containerService.findById(id);

        if (!containerModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contêiner não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(containerModelOptional.get());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ContainerModel>> listContainersByFilter(
        @RequestParam(value = "client", required = false) String client,
        @RequestParam(value = "numberContainer", required = false) String numberContainer,
        @RequestParam(value = "type", required = false) Integer type,
        @RequestParam(value = "status", required = false) String status,
        @RequestParam(value = "category", required = false) String category) {
        
        return ResponseEntity.status(HttpStatus.OK).body(containerService.listContainersByFilter(
            client, numberContainer, type, status, category
        ));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateContainer(@PathVariable(value = "id") UUID id,
            @RequestBody @Valid ContainerDto containerDto) {
        Optional<ContainerModel> containerModelOptional = containerService.findById(id);

        if (!containerModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contêiner não encontrado.");
        }
        var containerModel = new ContainerModel();
        BeanUtils.copyProperties(containerDto, containerModel);
        containerModel.setId(containerModelOptional.get().getId());
        containerModel.setCreatedAt(containerModelOptional.get().getCreatedAt());
        containerModel.setUpdatedAt(LocalDateTime.now(ZoneId.of("UTC")));
        return ResponseEntity.status(HttpStatus.OK).body(containerService.save(containerModel));
    }

    @GetMapping("/report")
    public ResponseEntity<List<ReportContainerSumpDto>> listContainerReport() {
        return ResponseEntity.status(HttpStatus.OK).body(containerService.listContainerReport());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteContainer(@PathVariable(value = "id") UUID id) {
        Optional<ContainerModel> containerModalOptional = containerService.findById(id);

        if (!containerModalOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contêiner não encontrado");
        }
        containerService.delete(containerModalOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Contêiner deletado com sucesso.");
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationException(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        List<String> errorList = result.getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + " - " + fieldError.getDefaultMessage())
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + errorList.toString());
    }
}
