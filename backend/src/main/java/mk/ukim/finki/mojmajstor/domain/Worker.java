package mk.ukim.finki.mojmajstor.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Entity
public class Worker {

    @jakarta.persistence.Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String address;

    private String municipality;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "average_rating")
    private Long averageRating;
}
