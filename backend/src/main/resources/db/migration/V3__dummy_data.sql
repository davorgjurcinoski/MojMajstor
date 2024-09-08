INSERT INTO Worker (description, address, municipality, phone_number, category) VALUES
                                                                                    ('Experienced electrician', '123 Street', 'aerodrom', '070123456', 'ELEKTRICHAR'),
                                                                                    ('Expert plumber', '234 Avenue', 'butel', '070234567', 'VODOINSTALATER'),
                                                                                    ('Professional carpenter', '345 Boulevard', 'centar', '070345678', 'AVTOMEHANICHAR'),
                                                                                    ('Licensed electrician', '456 Road', 'gaziBaba', '070456789', 'ELEKTRICHAR'),
                                                                                    ('Plumber with 10 years experience', '567 Path', 'gjorchePetrov', '070567890', 'VODOINSTALATER'),
                                                                                    ('Skilled carpenter', '678 Drive', 'karposh', '070678901', 'AVTOMEHANICHAR'),
                                                                                    ('Expert in electrical installations', '789 Lane', 'kiselaVoda', '070789012', 'ELEKTRICHAR'),
                                                                                    ('Professional plumber for large projects', '890 Trail', 'chair', '070890123', 'VODOINSTALATER'),
                                                                                    ('Carpenter specializing in custom furniture', '901 Way', 'saraj', '070901234', 'AVTOMEHANICHAR'),
                                                                                    ('Experienced electrician for industrial buildings', '101 Block', 'aerodrom', '070101112', 'ELEKTRICHAR')
;

INSERT INTO mojmajstor_user (email, full_name, password, role, worker_id) VALUES
                                                                              ('stefan.kostov@gmail.com', 'Stefan Kostov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070123456')),
                                                                              ('ivan.ivanov@gmail.com', 'Ivan Ivanov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070234567')),
                                                                              ('nikola.nikolic@gmail.com', 'Nikola Nikolic', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070345678')),
                                                                              ('petar.petrov@gmail.com', 'Petar Petrov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070456789')),
                                                                              ('aleksandar.stefanovski@gmail.com', 'Aleksandar Stefanovski', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070567890')),
                                                                              ('jovan.mitrevski@gmail.com', 'Jovan Mitrevski', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070678901')),
                                                                              ('goran.georgievski@gmail.com', 'Goran Georgievski', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070789012')),
                                                                              ('filip.nikolov@gmail.com', 'Filip Nikolov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070890123')),
                                                                              ('darko.dimov@gmail.com', 'Darko Dimov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070901234')),
                                                                              ('vladimir.stojanov@gmail.com', 'Vladimir Stojanov', 'password123', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '070101112'))
;