package com.dattcn2526nhom14.quanlyluutru.service;

import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.RoomResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import com.dattcn2526nhom14.quanlyluutru.mapper.RoomMapper;
import com.dattcn2526nhom14.quanlyluutru.repository.RoomRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomService {
    RoomRepository roomRepository;
    RoomMapper roomMapper;

    public RoomResponse create(RoomCreationRequest request) {
        if (roomRepository.existsByRoomName(request.getRoomName()))
            throw new RuntimeException("ROOM_ALREADY_EXISTS");
        Room room = roomMapper.toRoom(request);
        return roomMapper.toRoomResponse(roomRepository.save(room));
    }

    public List<Room> getAll() {
        return roomRepository.findAll();
    }

    public RoomResponse getById(String room_id) {
        return roomMapper.toRoomResponse(roomRepository.findById(room_id)
                .orElseThrow(() -> new RuntimeException("ROOM_DOES_NOT_EXISTS")));
    }

    public void deleteById(String room_id) {
        var room = roomRepository.findById(room_id)
                .orElseThrow(() -> new RuntimeException("ROOM_DOES_NOT_EXISTS"));
        roomRepository.deleteById(room_id);
    }

    public RoomResponse update(RoomUpdateRequest request, String room_id) {
        var room = roomRepository.findById(room_id)
                .orElseThrow(() -> new RuntimeException("ROOM_DOES_NOT_EXISTS"));
        roomMapper.updateRoom(room, request);
        roomRepository.save(room);
        return roomMapper.toRoomResponse(room);
    }
}
