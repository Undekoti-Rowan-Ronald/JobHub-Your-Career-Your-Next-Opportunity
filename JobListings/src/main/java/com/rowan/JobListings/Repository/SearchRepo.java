package com.rowan.JobListings.Repository;

import com.rowan.JobListings.Model.Post;

import java.util.List;

public interface SearchRepo {

    List<Post>findbyTest(String text);
}
