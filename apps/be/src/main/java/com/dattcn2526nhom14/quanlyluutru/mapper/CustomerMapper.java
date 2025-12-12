package com.dattcn2526nhom14.quanlyluutru.mapper;

import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.CustomerResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerResponse toCustomerResponse(Customer customer);

    Customer toCustomer(CustomerCreationRequest request);

    void updateCustomer(@MappingTarget Customer customer, CustomerUpdateRequest request);
}
