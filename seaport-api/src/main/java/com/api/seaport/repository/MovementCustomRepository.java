package com.api.seaport.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.api.seaport.dto.ReportMovementDto;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class MovementCustomRepository {
    private EntityManager em;

    public MovementCustomRepository(EntityManager em) {
        this.em = em;
    }
    /*
    public List<ReportMovementSumpDto> listMovementReportSump() {
        String query = "select m.type, count(m.id) as amount from MovementModel m group by m.type";
        TypedQuery<Object[]> q = em.createQuery(query, Object[].class);
        List<Object[]> results = q.getResultList();
    
        List<ReportMovementSumpDto> reportList = new ArrayList<>();
    
        for(Object[] result : results) {
            ReportMovementSumpDto dto = new ReportMovementSumpDto();
            dto.setType((String) result[0]);
            dto.setAmount((Long) result[1]);
            reportList.add(dto);
        }
    
        return reportList;
    }
    */

    public List<ReportMovementDto> listMovementReport() {
        String query = "select c.client, m.type, count(m.id) as amount from MovementModel m inner join ContainerModel c on c.id = m.container group by c.client, m.type, c.id";
        TypedQuery<Object[]> q = em.createQuery(query, Object[].class);
        List<Object[]> results = q.getResultList();
    
        List<ReportMovementDto> reportList = new ArrayList<>();
    
        for(Object[] result : results) {
            ReportMovementDto dto = new ReportMovementDto();
            dto.setClient((String) result[0]);
            dto.setType((String) result[1]);
            dto.setAmount((Long) result[2]);
            reportList.add(dto);
        }
    
        return reportList;
    }
}
