package com.atividadedesafiadora.smartclinic.paciente.services;

import com.atividadedesafiadora.smartclinic.paciente.dtos.PacienteResponseDTO;
import com.atividadedesafiadora.smartclinic.paciente.entities.Paciente;
import com.atividadedesafiadora.smartclinic.paciente.mapper.PacienteMapper;
import com.atividadedesafiadora.smartclinic.paciente.repositories.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final PacienteMapper pacienteMapper;

    public PacienteResponseDTO buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        return pacienteMapper.toDTO(paciente);
    }
}
