package com.api.seaport.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ContainerDto {
    @NotBlank
    private String client;
    @NotBlank
    private String numberContainer;
    @NotNull
    private Integer type;
    @NotBlank
    private String status;
    @NotBlank
    private String category;

    public String getClient() {
        return client;
    }
    public void setClient(String client) {
        this.client = client;
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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
}
