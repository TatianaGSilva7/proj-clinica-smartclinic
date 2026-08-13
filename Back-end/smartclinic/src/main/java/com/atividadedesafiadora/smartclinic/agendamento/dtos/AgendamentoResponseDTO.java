package com.atividadedesafiadora.smartclinic.agendamento.dtos;

import com.atividadedesafiadora.smartclinic.agendamento.enums.StatusAgendamento;
import lombok.Data;

import java.time.LocalDateTime;

public record AgendamentoResponseDTO(
        Long id,
        StatusAgendamento status,
        LocalDateTime dataCriacao,
        Long pacienteId,
        String nomePaciente,
        String cpfPaciente,
        Long horarioId,
        LocalDateTime dataHoraInicio,
        LocalDateTime dataHoraFim,
        String nomeMedico,
        String especialidadeMedico
) {}