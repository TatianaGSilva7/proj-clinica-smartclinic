package com.atividadedesafiadora.smartclinic.auth.dtos.login;

public record LoginResponseDTO(String token, String type, Long userId, String nome, String email, String role) {

    public LoginResponseDTO(String token, Long userId, String nome, String email, String role) {
        this(token, "Bearer", userId, nome, email, role);
    }
}
