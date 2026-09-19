package com.rowan.JobListings.Repository;

import com.rowan.JobListings.Controllor.Apply_controllor;
import com.rowan.JobListings.Model.Applyjob;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Mango_apply_repo extends MongoRepository<Applyjob,String> {
}
