package mk.ukim.finki.mojmajstor.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    int reviewingId;
    int rating;
    String comment;
}
