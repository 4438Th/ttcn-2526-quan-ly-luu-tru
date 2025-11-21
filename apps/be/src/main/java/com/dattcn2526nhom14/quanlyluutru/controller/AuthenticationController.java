package com.dattcn2526nhom14.quanlyluutru.controller;

import com.dattcn2526nhom14.quanlyluutru.dto.request.LoginRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.ApiResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.LoginResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.RoomResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import com.dattcn2526nhom14.quanlyluutru.service.AuthenticationService;
import com.dattcn2526nhom14.quanlyluutru.service.RoomService;
import com.dattcn2526nhom14.quanlyluutru.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    UserService userService;

    @PostMapping("/register")
    ApiResponse<UserResponse> register(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.create(request))
                .build();
    }
    @PostMapping("/login")
    ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        return ApiResponse.<LoginResponse>builder()
                .result(authenticationService.login(request))
                .build();
    }
}
