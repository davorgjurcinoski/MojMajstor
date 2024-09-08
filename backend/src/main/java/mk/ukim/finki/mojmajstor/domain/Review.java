package mk.ukim.finki.mojmajstor.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "from_id")
    Long fromId;

    @Column(name = "from_name")
    String fromName;

    @Column(name = "to_id")
    Long toId;

    String comment;

    int rating;

    public Review(Long fromId, String fromName, Long toId, String comment, int rating) {
        this.fromId = fromId;
        this.fromName = fromName;
        this.toId = toId;
        this.comment = comment;
        this.rating = rating;
    }
}
