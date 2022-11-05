package com.example.demo.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.transaction.Transactional;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;
import com.example.demo.Model.Transaction;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.TransactionRepository;
import com.lowagie.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class CustomerService {
    @Autowired
    private CustomerRepository crepo;

    @Autowired
    private TransactionRepository trepo;

    public boolean validate(Long customerId, String password) {
        Optional<Customer> customer = crepo.findById(customerId);
        if(customer.isEmpty()){
            return false;
        }else{
            Customer existingCustomer = customer.get();
            if(existingCustomer.getPassword().equals(password)){
                return true;
            }else{
                return false;
            }
        }
    }

    public Customer registerCustomer(Customer cust) {
        return crepo.save(cust); // invoke jpa repository save() method
    }

    public List<Customer> getAllCustomers() {
        return crepo.findAll();
    }

    public Optional<Customer> getById(Long id){
        return crepo.findById(id);
    }

    public void applyForLoan(Long id, Loan loan){
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        c.getListOfLoan().add(loan);
        crepo.save(c);
    }

    public void withdrawOrDeposit(Long id, Transaction transaction){
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        Double amount = transaction.getAmount();
        if(transaction.getTransactionType() == "Withdrawal"){
            c.setBalance(c.getBalance() - amount);
        }else{
            c.setBalance(c.getBalance() + amount);
        }
        trepo.save(transaction);
        c.getListOfTransaction().put(transaction.getTransactionId(), transaction);
        crepo.save(c);
    }

    public void dateFilter(Long id, Date startDate, Date endDate, HttpServletResponse response) throws DocumentException, IOException {
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        List<Transaction> listOfTransaction = new ArrayList<>();
        for(Transaction transaction : c.getListOfTransaction().values()){
            Date date = transaction.getTransactionDate();
            if(date.after(startDate) && date.before(endDate)){
                listOfTransaction.add(transaction);
            }
        }
        PdfExporter exporter = new PdfExporter(listOfTransaction);
        exporter.export(response);
    }
}

