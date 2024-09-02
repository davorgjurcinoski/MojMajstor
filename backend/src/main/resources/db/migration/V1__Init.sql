create table mojmajstor_user (
    id bigserial primary key not null,
    email varchar(255) not null,
    full_name varchar(255) not null,
    address varchar(255) not null,
    municipality varchar(255) not null,
    phone_number varchar(255) not null,
    password varchar(255) not null,
    role varchar(255) not null,
    description varchar(255)
);