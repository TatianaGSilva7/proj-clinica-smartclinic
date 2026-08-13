package com.atividadedesafiadora.smartclinic.paciente.repositories;

import com.atividadedesafiadora.smartclinic.paciente.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    boolean existsByCpf(String cpf);
}
