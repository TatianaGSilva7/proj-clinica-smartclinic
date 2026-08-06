package com.atividadedesafiadora.smartclinic.auth.dtos.user;

import com.atividadedesafiadora.smartclinic.auth.enums.Role;

public record UserResponseDTO(Long id, String nome, String email, Role role, Boolean ativo) {}
