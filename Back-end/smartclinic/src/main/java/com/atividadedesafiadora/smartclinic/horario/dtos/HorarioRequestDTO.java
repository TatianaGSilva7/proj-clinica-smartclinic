package com.atividadedesafiadora.smartclinic.horario.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

public record HorarioRequestDTO(
        @NotNull(message = "O ID do médico é obrigatório")
        Long medicoId,

        @NotNull(message = "A data/hora de início é obrigatória")
        LocalDateTime dataHoraInicio,

        @NotNull(message = "A data/hora de fim é obrigatória")
        LocalDateTime dataHoraFim
) {}