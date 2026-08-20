package com.atividadedesafiadora.smartclinic.agendamento.repositories;

import com.atividadedesafiadora.smartclinic.agendamento.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}
