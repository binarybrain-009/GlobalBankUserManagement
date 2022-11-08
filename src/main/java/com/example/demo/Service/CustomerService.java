package com.example.demo.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import com.example.demo.Model.Customer;
import com.example.demo.Model.Loan;
import com.example.demo.Model.Transaction;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Repository.TransactionRepository;
import com.lowagie.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {
    private Integer lastId = null;

    private Integer transactionId = null;
    @Autowired
    private CustomerRepository crepo;

    @Autowired
    private TransactionRepository trepo;

    public boolean validate(Integer customerId, String password) {
        Optional<Customer> customer = crepo.findById((long)customerId);
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
        if(lastId == null){
            Integer max = 0;
            for(Customer c: getAllCustomers()){
                max = Math.max(c.getCustomerId(), max);
            }
            lastId = max;
        }
        cust.setCustomerId(++lastId);
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
        if(transactionId == null){
            int max = 0;
            for(Customer c: getAllCustomers()){
                for(Transaction t: c.getListOfTransaction().values()){
                    max = Math.max(max, t.getTransactionId());
                }
            }
            transactionId = max;
        }
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        transactionId++;
        transaction.setTransactionId(transactionId);
        Double amount = transaction.getAmount();
        if(transaction.getTransactionType().equals("Withdraw")){
            c.setBalance(c.getBalance() - amount);
        }else{
            c.setBalance(c.getBalance() + amount);
        }
        transaction.setTransactionDate(new Date());
        trepo.save(transaction);
        c.getListOfTransaction().put(transaction.getTransactionId(), transaction);
        crepo.save(c);
    }

    public void dateFilter(Long id, Date startDate, Date endDate, HttpServletResponse response) throws DocumentException, IOException {
        System.out.println(startDate+" "+endDate);
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        List<Transaction> listOfTransaction = new ArrayList<>();
        for(Transaction transaction : c.getListOfTransaction().values()){
            Date date = transaction.getTransactionDate();
            if(date == null){continue;}
            if(date.after(startDate) && date.before(endDate)){
                listOfTransaction.add(transaction);
            }
        }
        PdfExporter exporter = new PdfExporter(listOfTransaction);
        exporter.export(response);
    }

    public void updateBalance(Double balance, Long id) {
        Optional<Customer> customer = getById(id);
        Customer c = customer.get();
        c.setBalance(balance);
    }

    public Integer getLastId() {
        if(lastId == null){
            Integer max = 0;
            for(Customer c: getAllCustomers()){
                max = Math.max(c.getCustomerId(), max);
            }
            lastId = max;
        }
        return lastId+1;
    }
}

