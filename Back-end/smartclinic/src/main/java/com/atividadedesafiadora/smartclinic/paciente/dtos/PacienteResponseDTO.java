package com.atividadedesafiadora.smartclinic.paciente.dtos;

import lombok.Data;

public record PacienteResponseDTO(Long id, String cpf, String telefone, Long userId, String nome, String email) {}