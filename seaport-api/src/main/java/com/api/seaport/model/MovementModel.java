package com.api.seaport.model;

import java.util.UUID;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "movements")
public class MovementModel {
    private static final long serialVersionUUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "type", nullable = false)
    private String type;
    @Column(name = "date_initial", nullable = false)
    private String dateInitial;
    @Column(name = "date_final", nullable = false)
    private String dateFinal;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "container_id", nullable = false)
    private ContainerModel container;

    public static long getSerialversionuuid() {
        return serialVersionUUID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDateInitial() {
        return dateInitial;
    }

    public void setDateInitial(String dateInitial) {
        this.dateInitial = dateInitial;
    }

    public String getDateFinal() {
        return dateFinal;
    }

    public void setDateFinal(String dateFinal) {
        this.dateFinal = dateFinal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public ContainerModel getContainer() {
        return container;
    }

    public void setContainer(ContainerModel container) {
        this.container = container;
    }
}
