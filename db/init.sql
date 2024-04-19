CREATE TABLE IF NOT EXISTS todos (
    id serial,
    description VARCHAR(255),
    is_complete boolean
);