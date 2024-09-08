create table review
(
    id        bigserial    not null,
    from_id   bigint       not null,
    from_name varchar(255) not null,
    to_id     bigint       not null,
    comment   varchar(255) not null,
    rating    bigint
)