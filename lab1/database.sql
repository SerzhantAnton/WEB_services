CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE professor(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
