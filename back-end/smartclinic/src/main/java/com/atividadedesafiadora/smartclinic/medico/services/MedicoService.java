package com.atividadedesafiadora.smartclinic.medico.services;

import com.atividadedesafiadora.smartclinic.auth.entities.User;
import com.atividadedesafiadora.smartclinic.auth.enums.Role;
import com.atividadedesafiadora.smartclinic.auth.repositories.UserRepository;
import com.atividadedesafiadora.smartclinic.medico.dtos.MedicoRequestDTO;
import com.atividadedesafiadora.smartclinic.medico.dtos.MedicoResponseDTO;
import com.atividadedesafiadora.smartclinic.medico.entities.Medico;
import com.atividadedesafiadora.smartclinic.medico.mappers.MedicoMapper;
import com.atividadedesafiadora.smartclinic.medico.repositories.MedicoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicoService {

    private final MedicoRepository medicoRepository;
    private final UserRepository userRepository;
    private final MedicoMapper medicoMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public MedicoResponseDTO cadastrar(MedicoRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }
        if (medicoRepository.existsByCrm(dto.crm())) {
            throw new IllegalArgumentException("CRM já cadastrado");
        }

        User user = new User();
        user.setNome(dto.nome());
        user.setEmail(dto.email());
        user.setSenha(passwordEncoder.encode(dto.senha()));
        user.setRole(Role.MEDICO);
        user.setAtivo(true);

        Medico medico = new Medico();
        medico.setCrm(dto.crm());
        medico.setEspecialidade(dto.especialidade());
        medico.setUser(user);

        Medico medicoSalvo = medicoRepository.save(medico);
        return medicoMapper.toDTO(medicoSalvo);
    }

    @Transactional
    public List<MedicoResponseDTO> listarTodos() {
        return medicoRepository.findAll()
                .stream()
                .map(medicoMapper::toDTO)
                .toList();
    }

    @Transactional
    public MedicoResponseDTO buscarPorId(Long id) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico não encontrado com o ID: " + id));
        return medicoMapper.toDTO(medico);
    }
}
