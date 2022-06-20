-- Use this file to define your SQL TABLEs
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE if exists albums;

CREATE TABLE albums (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    year_released INT NOT NULL
);

INSERT INTO albums (title, year_released) VALUES
('Section.80', 2011), 
('Good Kid, M.A.A.D City', 2012), 
('To Pimp a Butterfly', 2015), 
('Damn', 2017), 
('Mr. Morale & the Big Steppers', 2022);

DROP TABLE if exists artists;

CREATE TABLE artists (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    birth_year INT NOT NULL
);

INSERT INTO artists (name, birth_year) VALUES
('Kendrick Lamar', 1987), 
('Nas', 1973), 
('Tupac Shakur', 1971), 
('Kanye West', 1977); 

DROP TABLE if exists songs;

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    minutes int not null
);

INSERT INTO songs (title, minutes) VALUES
('The Art of Peer Pressure',5), 
('Backseat Freestyle',3), 
('Money Trees', 6), 
('Good Kid',3), 
('M.A.A.D City',5);

