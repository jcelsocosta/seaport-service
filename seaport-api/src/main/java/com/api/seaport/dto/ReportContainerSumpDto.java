package com.api.seaport.dto;

public class ReportContainerSumpDto {
    private Long importAmount;
    private Long exportAmount;

    public ReportContainerSumpDto() {
    }

    public ReportContainerSumpDto(Long importAmount, Long exportAmount) {
        this.importAmount = importAmount;
        this.exportAmount = exportAmount;
    }

    public Long getImportAmount() {
        return importAmount;
    }

    public void setImportAmount(Long importAmount) {
        this.importAmount = importAmount;
    }

    public Long getExportAmount() {
        return exportAmount;
    }

    public void setExportAmount(Long exportAmount) {
        this.exportAmount = exportAmount;
    }
    
}
