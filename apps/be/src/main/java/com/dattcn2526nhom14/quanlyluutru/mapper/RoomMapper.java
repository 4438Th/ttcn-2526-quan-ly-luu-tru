package com.dattcn2526nhom14.quanlyluutru.mapper;

import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.RoomUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.RoomResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.UserResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    RoomResponse toRoomResponse(Room room);

    Room toRoom(RoomCreationRequest request);

    void updateRoom(@MappingTarget Room room, RoomUpdateRequest request);
}
