package com.dattcn2526nhom14.quanlyluutru.service;

import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import com.dattcn2526nhom14.quanlyluutru.mapper.UserMapper;
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
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUserName(request.getUserName()))
            throw new RuntimeException("USER_ALREADY_EXISTS");
        User user = userMapper.toUser(request);
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public UserResponse getById(String user_id) {
        return userMapper.toUserResponse(userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("USER_DOES_NOT_EXISTS")));
    }

    public void deleteById(String user_id) {
        var user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("USER_DOES_NOT_EXISTS"));
        userRepository.deleteById(user_id);
    }

    public UserResponse update(UserUpdateRequest request, String user_id) {
        var user = userRepository.findById(user_id)
                .orElseThrow(() -> new RuntimeException("USER_DOES_NOT_EXISTS"));
        userMapper.updateUser(user, request);
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }
}
