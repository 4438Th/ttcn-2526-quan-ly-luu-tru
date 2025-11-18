package com.dattcn2526nhom14.quanlyluutru.controller;

import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.ApiResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import com.dattcn2526nhom14.quanlyluutru.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<User>> getAll() {
        return ApiResponse.<List<User>>builder()
                .result(userService.getAll())
                .build();
    }

    @GetMapping("/{user_id}")
    ApiResponse<UserResponse> getById(@PathVariable String user_id) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getById(user_id))
                .build();
    }

    @DeleteMapping("/{user_id}")
    ApiResponse<String> deleteById(@PathVariable String user_id) {
        userService.deleteById(user_id);
        return ApiResponse.<String>builder()
                .message("User has been deleted!")
                .build();
    }

    @PutMapping("/{user_id}")
    ApiResponse<UserResponse> update(@RequestBody UserUpdateRequest request, @PathVariable String user_id) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.update(request, user_id))
                .build();
    }
}
