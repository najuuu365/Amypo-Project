package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.SiftAccount;
import java.util.Optional;

public interface SiftAccountRepository extends JpaRepository<SiftAccount, Long> {
    
    Optional<SiftAccount> findByEmail(String email);
    
}