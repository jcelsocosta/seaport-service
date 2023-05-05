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

import com.api.seaport.dto.MovementDto;
import com.api.seaport.dto.ReportMovementDto;
import com.api.seaport.model.MovementModel;
import com.api.seaport.service.MovementService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/movement")

public class MovementController {
    @Autowired
    final MovementService movementService;

    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @PostMapping
    public ResponseEntity<Object> saveMovement(@RequestBody @Valid MovementDto movementDto) {
        var movementModel = new MovementModel();
        BeanUtils.copyProperties(movementDto, movementModel);
        movementModel.setCreatedAt(LocalDateTime.now(ZoneId.of("UTC")));
        movementModel.setUpdatedAt(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(movementService.save(movementModel));
    }

    @GetMapping
    public ResponseEntity<List<MovementModel>> getAllMovements() {
        return ResponseEntity.status(HttpStatus.OK).body(movementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getOneMovement(@PathVariable(value = "id") UUID id) {
        Optional<MovementModel> containerModelOptional = movementService.findById(id);

        if (!containerModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movimento não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(containerModelOptional.get());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<MovementModel>> listMovementsByFilter(
        @RequestParam(value = "type", required = false) String type,
        @RequestParam(value = "dateInitial", required = false) String dateInitial,
        @RequestParam(value = "dateFinal", required = false) String dateFinal,
        @RequestParam(value = "containerID", required = false) String containerID) {
        return ResponseEntity.status(HttpStatus.OK).body(movementService.listMovementsByFilter(
            type, dateInitial, dateFinal, containerID
        ));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMovement(@PathVariable(value = "id") UUID id,
            @RequestBody @Valid MovementDto movementDto) {
        Optional<MovementModel> movementModelOptional = movementService.findById(id);

        if (!movementModelOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movimentação não encontrada.");
        }
        var movementModel = new MovementModel();
        BeanUtils.copyProperties(movementDto, movementModel);
        movementModel.setId(movementModelOptional.get().getId());
        movementModel.setCreatedAt(movementModelOptional.get().getCreatedAt());
        movementModel.setUpdatedAt(LocalDateTime.now(ZoneId.of("UTC")));
        movementModel.setContainer(movementModelOptional.get().getContainer());
        return ResponseEntity.status(HttpStatus.OK).body(movementService.save(movementModel));
    }

    @GetMapping("/report")
    public ResponseEntity<List<ReportMovementDto>> listMovementReport() {
        return ResponseEntity.status(HttpStatus.OK).body(movementService.listMovementReport(
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMovement(@PathVariable(value = "id") UUID id) {
        Optional<MovementModel> movementModalOptional = movementService.findById(id);

        if (!movementModalOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movimennto não encontrado");
        }
        movementService.delete(movementModalOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Movimento deletado com sucesso.");
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
