package com.atividadedesafiadora.smartclinic.auth.services;

import com.atividadedesafiadora.smartclinic.auth.dtos.login.LoginRequestDTO;
import com.atividadedesafiadora.smartclinic.auth.dtos.login.LoginResponseDTO;
import com.atividadedesafiadora.smartclinic.auth.entities.User;
import com.atividadedesafiadora.smartclinic.auth.repositories.UserRepository;
import com.atividadedesafiadora.smartclinic.shared.config.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public LoginResponseDTO login(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails, user.getId(), user.getRole().name());

        return new LoginResponseDTO(
                token,
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
