package mk.ukim.finki.mojmajstor.domain;


import jakarta.persistence.*;
import lombok.*;

@Table(name = "mojmajstor_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @jakarta.persistence.Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(name = "full_name")
    private String fullName;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "worker_id")
    private Worker worker;

}
