package com.rowan.JobListings.Controllor;

import com.rowan.JobListings.Model.Post;
import com.rowan.JobListings.Repository.MongoRepo;
import com.rowan.JobListings.Repository.SearchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
public class PostController {
    @Autowired
    MongoRepo repo;

    @Autowired
    SearchRepo serrep;

    @GetMapping("/myposts")
    public List<Post> getallPosts() {

      return repo.findAll();

    }
    @PostMapping("/send_post")
    public Post addPost(@RequestBody Post post){
        return repo.save(post);

    }
    @GetMapping("/getpost/{id}")
    public Post getonepost(@PathVariable String id){
        return repo.findById(id).orElse(null);
    }

    @GetMapping("/search/{words}")
    public List<Post>search(@PathVariable String words){
        return serrep.findbyTest(words);
    }
    @PostMapping("/admin")
    public List<Post>admin(){
        return repo.findAll();
    }
}
