package com.api.seaport.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.api.seaport.dto.ReportContainerSumpDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class ContainerCustomRepository {
    private EntityManager em;

    public ContainerCustomRepository(EntityManager em) {
        this.em = em;
    }

    public List<ReportContainerSumpDto> listContainerReport() {
        String query = "select sum(case when c.category = 'Exportação' then 1 else 0 end) as export_amount, sum(case when c.category = 'Importação' then 1 else 0 end) as import_amount from ContainerModel c";
        TypedQuery<Object[]> q = em.createQuery(query, Object[].class);
        List<Object[]> results = q.getResultList();
    
        List<ReportContainerSumpDto> reportList = new ArrayList<>();
    
        for(Object[] result : results) {
            ReportContainerSumpDto dto = new ReportContainerSumpDto();
            dto.setExportAmount((Long) result[0]);
            dto.setImportAmount((Long) result[1]);
            reportList.add(dto);
        }
    
        return reportList;
    }
}
