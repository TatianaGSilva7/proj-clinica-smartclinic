package com.atividadedesafiadora.smartclinic.agendamento.dtos;

import com.atividadedesafiadora.smartclinic.agendamento.enums.StatusAgendamento;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AgendamentoResponseDTO {
    private Long id;
    private StatusAgendamento status;
    private LocalDateTime dataCriacao;
    private Long pacienteId;
    private String nomePaciente;
    private String cpfPaciente;
    private Long horarioId;
    private LocalDateTime dataHoraInicio;
    private LocalDateTime dataHoraFim;
    private String nomeMedico;
    private String especialidadeMedico;
}