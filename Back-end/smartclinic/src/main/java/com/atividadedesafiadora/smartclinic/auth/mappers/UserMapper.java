package com.atividadedesafiadora.smartclinic.auth.mappers;

import com.atividadedesafiadora.smartclinic.auth.dtos.user.UserResponseDTO;
import com.atividadedesafiadora.smartclinic.auth.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponseDTO toDTO(User user);
}