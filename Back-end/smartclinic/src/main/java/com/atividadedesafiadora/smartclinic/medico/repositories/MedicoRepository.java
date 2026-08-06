package com.atividadedesafiadora.smartclinic.medico.repositories;

import com.atividadedesafiadora.smartclinic.medico.entities.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
    boolean existsByCrm(String crm);
}
