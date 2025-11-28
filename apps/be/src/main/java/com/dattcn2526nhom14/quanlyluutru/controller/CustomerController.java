package com.dattcn2526nhom14.quanlyluutru.controller;

import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.UserUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.ApiResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.CustomerResponse;
import com.dattcn2526nhom14.quanlyluutru.dto.response.CustomerResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Customer;
import com.dattcn2526nhom14.quanlyluutru.entity.User;
import com.dattcn2526nhom14.quanlyluutru.service.CustomerService;
import com.dattcn2526nhom14.quanlyluutru.service.CustomerService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    CustomerService customerService;

    @PostMapping
    ApiResponse<CustomerResponse> createUser(@RequestBody CustomerCreationRequest request) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<Customer>> getAll() {
        return ApiResponse.<List<Customer>>builder()
                .result(customerService.getAll())
                .build();
    }

    @GetMapping("/{cus_id}")
    ApiResponse<CustomerResponse> getById(@PathVariable String cus_id) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.getById(cus_id))
                .build();
    }

    @DeleteMapping("/{cus_id}")
    ApiResponse<String> deleteById(@PathVariable String cus_id) {
        customerService.deleteById(cus_id);
        return ApiResponse.<String>builder()
                .message("Customer has been deleted!")
                .build();
    }

    @PutMapping("/{cus_id}")
    ApiResponse<CustomerResponse> update(@RequestBody CustomerUpdateRequest request, @PathVariable String cus_id) {
        return ApiResponse.<CustomerResponse>builder()
                .result(customerService.update(request, cus_id))
                .build();
    }
    @DeleteMapping
    ApiResponse<String> deleteAll(){
        customerService.deleteAll();
        return ApiResponse.<String>builder()
                .message("All customer have ben deleted!").build();
    }
}
