package com.atividadedesafiadora.smartclinic.auth.repositories;

import com.atividadedesafiadora.smartclinic.auth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
