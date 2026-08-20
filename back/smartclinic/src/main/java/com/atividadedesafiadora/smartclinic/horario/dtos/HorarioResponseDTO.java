package com.atividadedesafiadora.smartclinic.horario.dtos;

import lombok.Data;

import java.time.LocalDateTime;

public record HorarioResponseDTO(Long id, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim, Long medicoId, String nomeMedico, String especialidadeMedico) {}