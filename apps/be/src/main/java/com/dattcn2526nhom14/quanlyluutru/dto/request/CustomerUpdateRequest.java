package com.dattcn2526nhom14.quanlyluutru.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerUpdateRequest {
    String perId;
    String firstName;
    String lastName;
    String address;
    String phone;
}
