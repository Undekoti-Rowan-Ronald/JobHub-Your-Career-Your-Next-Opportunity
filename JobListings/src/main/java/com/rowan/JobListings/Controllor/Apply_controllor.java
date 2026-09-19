package com.rowan.JobListings.Controllor;

import com.rowan.JobListings.Model.Applyjob;
import com.rowan.JobListings.Repository.Mango_apply_repo;
import com.rowan.JobListings.Repository.MongoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin

public class Apply_controllor {
    @Autowired
    Mango_apply_repo mangoApplyRepo;

    @PostMapping("/apply")
    public Applyjob Apply(@RequestBody Applyjob applyjob) {
        return mangoApplyRepo.save(applyjob);
    }
}
