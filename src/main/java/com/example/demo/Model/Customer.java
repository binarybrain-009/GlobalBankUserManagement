package com.example.demo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Document(collection = "Customer")
public class Customer {

    @Id
    private Integer customerId;

    private Double balance;
    private String fname;
    private String lname;
    private String password;
    @Indexed(unique=true)
    private String phoneNo;
    @Indexed(unique=true)
    private String email;

    private LocalDate dob;

    private String occupation;
    private String city;


    List<Loan> listOfLoan = new ArrayList<>();
    HashMap<Integer, Transaction>  listOfTransaction = new HashMap<>();

    public Integer getCustomerId() {
        return customerId;
    }


    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public List<Loan> getListOfLoan() {
        return listOfLoan;
    }

    public HashMap<Integer, Transaction> getListOfTransaction() {
        return listOfTransaction;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }
}
