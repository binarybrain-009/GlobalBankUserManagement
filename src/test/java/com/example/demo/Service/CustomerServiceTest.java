package com.example.demo.Service;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;
import com.example.demo.Model.Transaction;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.TransactionRepository;
import com.lowagie.text.DocumentException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {
    @InjectMocks
    CustomerService customerService;

    @Mock
    CustomerRepository customerRepository;

    @Mock
    TransactionRepository transactionRepository;

    @Mock
    HttpServletResponse httpServletResponse;

    private Customer customer;

    @BeforeEach
    private void create(){
        customer = new Customer();
        customer.setCustomerId(1);
        customer.setBalance(10000.00);
        customer.setPassword("1234");
    }
    @Test
    void validateWithNullCustomer() {
        Optional<Customer> optional = Optional.empty();
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(optional);
        assertFalse(customerService.validate(customer.getCustomerId(), customer.getPassword()));
    }

    @Test
    void loginCustomerWithValidCustomer() {
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        assertTrue(customerService.validate(customer.getCustomerId(), customer.getPassword()));
    }
    @Test
    void loginCustomerWithValidCustomerWithWrongPassword() {
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        assertFalse(customerService.validate(customer.getCustomerId(), "abcd"));
    }

    @Test
    void registerCustomers() {
        given(customerRepository.save(customer)).willReturn(customer);
        assertNotNull(customerService.registerCustomer(customer));
    }

    @Test
    void getAllCustomer(){
    }

    @Test
    void getById() {
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        assertNotNull(customerService.getById((long)customer.getCustomerId()));
    }

    @Test
    void applyForLoan() {
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        Loan loan = new Loan();
        customerService.applyForLoan((long)customer.getCustomerId(), loan);
    }

    @Test
    void withdrawOrDeposit() {
        given(transactionRepository.findAll()).willReturn(new ArrayList<Transaction>());
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        Transaction transaction = new Transaction();
        transaction.setTransactionType("Withdraw");
        customerService.withdrawOrDeposit((long)customer.getCustomerId(), transaction);
    }

    @Test
    void dateFilter() throws DocumentException, IOException {
        given(customerRepository.findById((long)customer.getCustomerId())).willReturn(Optional.ofNullable(customer));
        customerService.dateFilter((long) customer.getCustomerId(), new Date(1/11/2022), new Date(2/11/2022));
    }

    @Test
    void getLastId() {
        assertEquals(1, customerService.getLastId());
    }
}