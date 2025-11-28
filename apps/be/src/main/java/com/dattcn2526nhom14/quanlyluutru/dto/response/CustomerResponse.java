package com.dattcn2526nhom14.quanlyluutru.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomResponse {
    String per_id;
    String firstName;
    String lastName;
    String address;
    String phone;
}
