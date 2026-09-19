package com.rowan.JobListings.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "apply")
public class Applyjob {
    private String name;
    private String email;
    private String phone_no;
    private String current_company;
    private double current_CTC;
    private double expected_CTC;
    private String notice_period;

    @Override
    public String toString() {
        return "Applyjob{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone_no=" + phone_no +
                ", current_company='" + current_company + '\'' +
                ", current_CTC=" + current_CTC +
                ", expected_CTC=" + expected_CTC +
                ", notice_period='" + notice_period + '\'' +
                '}';
    }
}
