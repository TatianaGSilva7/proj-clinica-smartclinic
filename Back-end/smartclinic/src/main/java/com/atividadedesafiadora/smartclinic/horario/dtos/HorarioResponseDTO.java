package com.atividadedesafiadora.smartclinic.horario.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HorarioResponseDTO {

    private Long id;
    private LocalDateTime dataHoraInicio;
    private LocalDateTime dataHoraFim;

    private Long medicoId;
    private String nomeMedico;
    private String especialidadeMedico;
}