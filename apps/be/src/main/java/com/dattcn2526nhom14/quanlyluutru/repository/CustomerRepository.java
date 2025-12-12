package com.dattcn2526nhom14.quanlyluutru.repository;

import com.dattcn2526nhom14.quanlyluutru.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    boolean existsByPerId(String perId);
}
