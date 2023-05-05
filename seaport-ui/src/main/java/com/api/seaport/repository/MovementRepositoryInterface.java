package com.api.seaport.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.seaport.model.MovementModel;

public interface MovementRepositoryInterface extends JpaRepository<MovementModel, UUID>{
    @Query(value = "SELECT m FROM MovementModel as m JOIN m.container c where ( :type is null or m.type = :type ) and ( :dateInitial is null or m.dateInitial = :dateInitial) and ( :dateFinal is null or m.dateFinal = :dateFinal ) and ( :containerID is null or c.id = CAST(:containerID AS uuid)) ORDER BY m.createdAt ASC", nativeQuery = false)
    List<MovementModel> listMovementsByFilter(@Param("type") String type,
        @Param("dateInitial") String dateInitial, @Param("dateFinal") String dateFinal,
        @Param("containerID") String containerID);
}
