package com.example.demo.Repository;

import com.example.demo.Model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface TransactionRepository extends MongoRepository<Transaction, Long> {
}
