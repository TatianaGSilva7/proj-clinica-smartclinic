package com.atividadedesafiadora.smartclinic.agendamento.mappers;

import com.atividadedesafiadora.smartclinic.agendamento.dtos.AgendamentoRequestDTO;
import com.atividadedesafiadora.smartclinic.agendamento.dtos.AgendamentoResponseDTO;
import com.atividadedesafiadora.smartclinic.agendamento.entities.Agendamento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AgendamentoMapper {

    @Mapping(source = "paciente.id", target = "pacienteId")
    @Mapping(source = "paciente.user.nome", target = "nomePaciente")
    @Mapping(source = "paciente.cpf", target = "cpfPaciente")
    @Mapping(source = "horario.id", target = "horarioId")
    @Mapping(source = "horario.dataHoraInicio", target = "dataHoraInicio")
    @Mapping(source = "horario.dataHoraFim", target = "dataHoraFim")
    @Mapping(source = "horario.medico.user.nome", target = "nomeMedico")
    @Mapping(source = "horario.medico.especialidade", target = "especialidadeMedico")
    AgendamentoResponseDTO toDTO(Agendamento agendamento);

    @Mapping(source = "pacienteId", target = "paciente.id")
    @Mapping(source = "horarioId", target = "horario.id")
    Agendamento toEntity(AgendamentoRequestDTO dto);
}