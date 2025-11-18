package com.dattcn2526nhom14.quanlyluutru.controller;

import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.ApiResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.RoomResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import com.dattcn2526nhom14.quanlyluutru.service.RoomService;
import com.dattcn2526nhom14.quanlyluutru.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomController {
    RoomService roomService;

    @PostMapping
    ApiResponse<RoomResponse> create(@RequestBody RoomCreationRequest request) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<Room>> getAll() {
        return ApiResponse.<List<Room>>builder()
                .result(roomService.getAll())
                .build();
    }

    @GetMapping("/{room_id}")
    ApiResponse<RoomResponse> getById(@PathVariable String room_id) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.getById(room_id))
                .build();
    }

    @DeleteMapping("/{room_id}")
    ApiResponse<String> deleteById(@PathVariable String room_id) {
        roomService.deleteById(room_id);
        return ApiResponse.<String>builder()
                .message("Room has been deleted!")
                .build();
    }

    @PutMapping("/{room_id}")
    ApiResponse<RoomResponse> update(@RequestBody RoomUpdateRequest request, @PathVariable String room_id) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.update(request, room_id))
                .build();
    }
}
