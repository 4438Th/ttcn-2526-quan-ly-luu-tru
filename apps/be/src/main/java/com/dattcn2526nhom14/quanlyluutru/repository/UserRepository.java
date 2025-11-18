package com.dattcn2526nhom14.quanlyluutru.repository;

import com.dattcn2526nhom14.quanlyluutru.entity.User;
import org.mapstruct.control.MappingControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    boolean existsByUserName(String userName);
}
