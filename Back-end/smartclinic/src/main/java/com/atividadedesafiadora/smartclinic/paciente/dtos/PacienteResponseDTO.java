package com.atividadedesafiadora.smartclinic.paciente.dtos;

import lombok.Data;

@Data
public class PacienteResponseDTO {
    private Long id;
    private String cpf;
    private String telefone;

    private String nome;
    private String email;
}
