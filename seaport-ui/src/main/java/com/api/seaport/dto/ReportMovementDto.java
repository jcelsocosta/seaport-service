package com.api.seaport.dto;

public class ReportMovementDto {
    private String client;
    private String type;
    private Long amount;

    public ReportMovementDto() {
    }

    public ReportMovementDto(String client, String type, Long amount) {
        this.client = client;
        this.type = type;
        this.amount = amount;
    }
    
    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }
    
}
