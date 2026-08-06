package com.atividadedesafiadora.smartclinic.agendamento.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public record AgendamentoRequestDTO(
        @NotNull(message = "O ID do paciente é obrigatório")
        Long pacienteId,

        @NotNull(message = "O ID do horário é obrigatório")
        Long horarioId
) {}