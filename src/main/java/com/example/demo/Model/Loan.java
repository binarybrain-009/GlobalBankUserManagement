package com.example.demo.Model;

public class Loan {
    private enum bank{
        Hyderabad,
        Bangalore,
        Chennai
    }

    private double amount;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
