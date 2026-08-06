package com.atividadedesafiadora.smartclinic.horario.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HorarioRequestDTO {

    @NotNull(message = "O ID do médico é obrigatório")
    private Long medicoId;

    @NotNull(message = "A data/hora de início é obrigatória")
    private LocalDateTime dataHoraInicio;

    @NotNull(message = "A data/hora de fim é obrigatória")
    private LocalDateTime dataHoraFim;
}