package com.atividadedesafiadora.smartclinic.horario.repositories;

import com.atividadedesafiadora.smartclinic.horario.entities.Horario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HorarioRepository extends JpaRepository<Horario, Long> {
}
