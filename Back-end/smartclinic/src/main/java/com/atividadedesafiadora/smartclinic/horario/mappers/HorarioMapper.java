package com.atividadedesafiadora.smartclinic.horario.mappers;

import com.atividadedesafiadora.smartclinic.horario.dtos.HorarioRequestDTO;
import com.atividadedesafiadora.smartclinic.horario.dtos.HorarioResponseDTO;
import com.atividadedesafiadora.smartclinic.horario.entities.Horario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HorarioMapper {

    @Mapping(source = "medico.id", target = "medicoId")
    @Mapping(source = "medico.user.nome", target = "nomeMedico")
    @Mapping(source = "medico.especialidade", target = "especialidadeMedico")
    HorarioResponseDTO toDTO(Horario horario);

    @Mapping(source = "medicoId", target = "medico.id")
    Horario toEntity(HorarioRequestDTO dto);
}