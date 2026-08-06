package com.atividadedesafiadora.smartclinic.medico.dtos;

import lombok.Data;

public record MedicoResponseDTO(Long id, String crm, String especialidade, Long userId, String nome, String email) {}