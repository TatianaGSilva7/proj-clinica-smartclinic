package com.atividadedesafiadora.smartclinic.medico.mappers;

import com.atividadedesafiadora.smartclinic.medico.dtos.MedicoRequestDTO;
import com.atividadedesafiadora.smartclinic.medico.dtos.MedicoResponseDTO;
import com.atividadedesafiadora.smartclinic.medico.entities.Medico;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MedicoMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.nome", target = "nome")
    @Mapping(source = "user.email", target = "email")
    MedicoResponseDTO toDTO(Medico medico);

    @Mapping(source = "nome", target = "user.nome")
    @Mapping(source = "email", target = "user.email")
    @Mapping(source = "senha", target = "user.senha")
    Medico toEntity(MedicoRequestDTO dto);
}
