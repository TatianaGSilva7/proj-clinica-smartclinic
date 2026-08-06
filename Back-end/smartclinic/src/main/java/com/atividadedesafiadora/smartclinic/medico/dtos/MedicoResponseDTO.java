package com.atividadedesafiadora.smartclinic.medico.dtos;

import lombok.Data;

@Data
public class MedicoResponseDTO {
    private Long id;
    private String crm;
    private String especialidade;
    private Long userId;
    private String nome;
    private String email;
}