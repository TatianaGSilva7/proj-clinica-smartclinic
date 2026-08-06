package com.atividadedesafiadora.smartclinic.paciente.services;

import com.atividadedesafiadora.smartclinic.auth.entities.User;
import com.atividadedesafiadora.smartclinic.auth.enums.Role;
import com.atividadedesafiadora.smartclinic.auth.repositories.UserRepository;
import com.atividadedesafiadora.smartclinic.paciente.dtos.PacienteRequestDTO;
import com.atividadedesafiadora.smartclinic.paciente.dtos.PacienteResponseDTO;
import com.atividadedesafiadora.smartclinic.paciente.entities.Paciente;
import com.atividadedesafiadora.smartclinic.paciente.mappers.PacienteMapper;
import com.atividadedesafiadora.smartclinic.paciente.repositories.PacienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final UserRepository userRepository;
    private final PacienteMapper pacienteMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public PacienteResponseDTO cadastrar(PacienteRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        if (pacienteRepository.existsByCpf(dto.cpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }

        User user = new User();
        user.setNome(dto.nome());
        user.setEmail(dto.email());
        user.setSenha(passwordEncoder.encode(dto.senha()));
        user.setRole(Role.PACIENTE);
        user.setAtivo(true);

        Paciente paciente = new Paciente();
        paciente.setCpf(dto.cpf());
        paciente.setTelefone(dto.telefone());
        paciente.setUser(user);

        Paciente pacienteSalvo = pacienteRepository.save(paciente);
        return pacienteMapper.toDTO(pacienteSalvo);
    }

    @Transactional
    public List<PacienteResponseDTO> listarTodos() {
        return pacienteRepository.findAll()
                .stream()
                .map(pacienteMapper::toDTO)
                .toList();
    }

    @Transactional
    public PacienteResponseDTO buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com o ID: " + id));
        return pacienteMapper.toDTO(paciente);
    }
}
