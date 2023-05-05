package com.api.seaport.model;

import java.util.List;
import java.util.UUID;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "containers", schema = "register")
public class ContainerModel {
    private static final long serialVersionUUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(name = "client", nullable = false, length = 200)
    private String client;
    @Column(name = "number_container", nullable = false, unique = true, length = 11)
    private String numberContainer;
    @Column(name = "type", nullable = false, length = 2)
    private Integer type;
    @Column(name = "status", nullable = false, length = 15)
    private String status;
    @Column(name = "category", nullable = false, length = 15)
    private String category;
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "container", cascade = CascadeType.ALL)
    private List<MovementModel> movements;

    public static long getSerialversionuuid() {
        return serialVersionUUID;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNumberContainer() {
        return numberContainer;
    }

    public void setNumberContainer(String numberContainer) {
        this.numberContainer = numberContainer;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

}
