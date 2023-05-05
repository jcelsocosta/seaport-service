package com.api.seaport.dto;

import com.api.seaport.model.ContainerModel;

import jakarta.validation.constraints.NotBlank;

public class MovementDto {
    @NotBlank
    private String type;
    @NotBlank
    private String dateInitial;
    @NotBlank
    private String dateFinal;
    private ContainerModel container;

    public void setType(String type) {
        this.type = type;
    }

    public void setDateFinal(String dateFinal) {
        this.dateFinal = dateFinal;
    }

    public void setDateInitial(String dateInitial) {
        this.dateInitial = dateInitial;
    }

    public String getType() {
        return type;
    }

    public String getDateFinal() {
        return dateFinal;
    }

    public String getDateInitial() {
        return dateInitial;
    }

    public ContainerModel getContainer() {
        return container;
    }

    public void setContainer(ContainerModel container) {
        this.container = container;
    }
}

