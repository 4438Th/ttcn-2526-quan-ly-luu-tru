package com.dattcn2526nhom14.quanlyluutru.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomCreationRequest {
    String roomName;
    double price;
    int capacity;
    String state;
}
