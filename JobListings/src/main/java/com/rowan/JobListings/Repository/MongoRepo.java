package com.rowan.JobListings.Repository;

import com.rowan.JobListings.Model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MongoRepo extends MongoRepository <Post, String> {

}
