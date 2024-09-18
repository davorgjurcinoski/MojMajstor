insert into worker (description, address, municipality, phone_number, category) VALUES ('тест', 'тест', 'aerodrom', '123456789', 'ELEKTRICHAR');

insert into mojmajstor_user(email, full_name, password, role, worker_id)
values ('admin2@admin.com', 'admin2', '$2a$10$7la/wExf2BBj9DZy15Nc8O.gryZHTg0yO5ouNvAuRt5NC1CFov.n2', 'MAJSTOR', (SELECT id FROM Worker WHERE phone_number = '123456789'));

-- password: Admin123
