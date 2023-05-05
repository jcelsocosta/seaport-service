package com.api.seaport.dto;

public class ContainerFilterDto {
    private String client;
    private String numberContainer;
    private Integer type;
    private String status;
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
