package com.api.seaport.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.seaport.model.ContainerModel;

public interface ContainerRepositoryInterface extends JpaRepository<ContainerModel, UUID> {
    boolean existsByNumberContainer(String numberContainer);

    @Query(value = "SELECT c FROM ContainerModel as c where ( :client is null or c.client ilike concat('%',:client,'%') ) and ( :numberContainer is null or c.numberContainer ilike concat('%', :numberContainer, '%') ) and ( :type is null or c.type = :type) and ( :status is null or c.status = :status) and ( :category is null or c.category = :category ) ORDER BY c.createdAt ASC", nativeQuery = false)
    List<ContainerModel> listContainersByFilter(@Param("client") String client,
        @Param("numberContainer") String numberContainer, @Param("type") Integer type,
        @Param("status") String status, @Param("category") String category);
}
