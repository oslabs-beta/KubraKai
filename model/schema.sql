DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    email varchar PRIMARY KEY,
    pwd varchar NOT NULL
);

CREATE TABLE credentials(
    _id serial PRIMARY KEY,
    oauth varchar NOT NULL,    
    email_fk varchar NOT NULL,
    FOREIGN KEY (email_fk) 
        REFERENCES users(email)
);

insert into users (firstName, lastName, email, pwd) values ('Anthony', 'Martinez','anthony@amartinez.cc', 'temp');
insert into users (firstName, lastName, email, pwd) values  ('Jessica', 'Martinez','jessica@amartinez.cc', 'temp');
insert into users (firstName, lastName, email, pwd) values  ('Jillian', 'Martinez','jillian@amartinez.cc', 'temp');
insert into users (firstName, lastName, email, pwd) values  ('Archer', 'Martinez','archer@amartinez.cc', 'temp');

insert into credentials (_id, oauth, email_fk) values (DEFAULT, 'facebook', 'anthony@amartinez.cc');
insert into credentials (_id, oauth, email_fk) values (DEFAULT, 'google', 'anthony@amartinez.cc');