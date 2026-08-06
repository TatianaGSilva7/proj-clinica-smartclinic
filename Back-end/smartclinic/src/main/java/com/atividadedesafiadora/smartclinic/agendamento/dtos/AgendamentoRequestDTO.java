package com.atividadedesafiadora.smartclinic.agendamento.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AgendamentoRequestDTO {
    @NotNull(message = "O ID do paciente é obrigatório")
    private Long pacienteId;

    @NotNull(message = "O ID do horário é obrigatório")
    private Long horarioId;
}