package com.rowan.JobListings.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "JobPost")
@Data

public class Post {

    private String profile;
    private String description;
    private List<String>  tech;



    @Override
    public String toString() {
        return "Post{" +
                "profile='" + profile + '\'' +
                ", description='" + description + '\'' +
                ", tech='" + tech + '\'' +
                '}';
    }
}