package com.dattcn2526nhom14.quanlyluutru.repository;

import com.dattcn2526nhom14.quanlyluutru.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room,String> {
    boolean existsByRoomName(String roomName);
}
