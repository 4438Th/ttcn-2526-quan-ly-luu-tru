package com.dattcn2526nhom14.quanlyluutru.service;

import com.dattcn2526nhom14.quanlyluutru.dto.request.LoginRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.LoginResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.RoomResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import com.dattcn2526nhom14.quanlyluutru.mapper.RoomMapper;
import com.dattcn2526nhom14.quanlyluutru.mapper.UserMapper;
import com.dattcn2526nhom14.quanlyluutru.repository.RoomRepository;
import com.dattcn2526nhom14.quanlyluutru.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    UserMapper userMapper;
    public LoginResponse login(LoginRequest request) {
        var user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new RuntimeException("USER_DOES_NOT_EXISTED"));
        boolean success = passwordEncoder.matches(request.getPassWord(), user.getPassWord());
        return LoginResponse.builder()
                .userResponse(userMapper.toUserResponse(user))
                .success(success)
                .build();
    }


}
