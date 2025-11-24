package com.dattcn2526nhom14.quanlyluutru.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUpdateRequest {
    String roomName;
    String price;
    int capacity;
    String state;
}
