package com.dattcn2526nhom14.quanlyluutru.service;

import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerCreationRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.request.CustomerUpdateRequest;
import com.dattcn2526nhom14.quanlyluutru.dto.response.CustomerResponse;
import com.dattcn2526nhom14.quanlyluutru.entity.Customer;
import com.dattcn2526nhom14.quanlyluutru.mapper.CustomerMapper;
import com.dattcn2526nhom14.quanlyluutru.repository.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomService {
    CustomerRepository customRepository;
    CustomerMapper customerMapper;

    public CustomerResponse create(CustomerCreationRequest request) {
        if (customRepository.existsByPerId(request.getPerId()))
            throw new RuntimeException("CUSTOMER_ALREADY_EXISTS");
        Customer customer = customerMapper.toCustomer(request);
        return customerMapper.toCustomerResponse(customRepository.save(customer));
    }

    public List<Customer> getAll() {
        return customRepository.findAll();
    }

    public CustomerResponse getById(String cus_Id) {
        return customerMapper.toCustomerResponse(customRepository.findById(cus_Id)
                .orElseThrow(() -> new RuntimeException("CUSTOMER_DOES_NOT_EXISTS")));
    }

    public void deleteById(String cus_Id) {
        var customer = customRepository.findById(cus_Id)
                .orElseThrow(() -> new RuntimeException("CUSTOMER_DOES_NOT_EXISTS"));
        customRepository.deleteById(cus_Id);
    }

    public CustomerResponse update(CustomerUpdateRequest request, String cus_Id) {
        var customer = customRepository.findById(cus_Id)
                .orElseThrow(() -> new RuntimeException("CUSTOMER_DOES_NOT_EXISTS"));
        customerMapper.updateCustomer(customer, request);
        customRepository.save(customer);
        return customerMapper.toCustomerResponse(customer);
    }
    public void deleteAll(){
        customRepository.deleteAll();
    }
}
