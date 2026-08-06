package com.atividadedesafiadora.smartclinic.paciente.mapper;

import com.atividadedesafiadora.smartclinic.paciente.dtos.PacienteResponseDTO;
import com.atividadedesafiadora.smartclinic.paciente.entities.Paciente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PacienteMapper {

    // Mapeia os atributos aninhados de 'user.nome' e 'user.email' que são da classe User
    @Mapping(source = "user.nome", target = "nome")
    @Mapping(source = "user.email", target = "email")
    PacienteResponseDTO toDTO(Paciente paciente);

    // Mapeamento inverso
    @Mapping(source = "nome", target = "user.nome")
    @Mapping(source = "email", target = "user.email")
    Paciente toEntity(PacienteResponseDTO dto);
}