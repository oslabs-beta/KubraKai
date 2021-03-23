DROP TABLE IF EXISTS userIp;
DROP TABLE IF EXISTS localUsers;
DROP TABLE IF EXISTS oauthUsers;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    firstname varchar NOT NULL,
    lastname varchar NOT NULL,
    email varchar PRIMARY KEY
);

CREATE TABLE localUsers(
  _id serial PRIMARY KEY,
  pwd varchar NOT NULL,
  email_fk varchar NOT NULL,
  FOREIGN KEY (email_fk) 
    REFERENCES users(email)
);

CREATE TABLE oauthUsers(
  oauth_id varchar PRIMARY KEY, 
  oauth_type varchar NOT NULL,   
  email_fk varchar NOT NULL,
  FOREIGN KEY (email_fk) 
    REFERENCES users(email)
);

CREATE TABLE userIp(
  userIp varchar NOT NULL, 
  email_fk varchar NOT NULL,
  PRIMARY KEY(userIp, email_fk)
  FOREIGN KEY (email_fk),
    REFERENCES users(email)
);

-- CREATE TABLE userIp(
--   _id serial PRIMARY KEY, 
--   userIp varchar UNIQUE, 
--   email_fk varchar NOT NULL,
--   FOREIGN KEY (email_fk)
--     REFERENCES users(email)
-- );


insert into users (firstName, lastName, email) values ('Daniel', 'Balistocky','thestinx@gmail.com');
insert into oauthUsers (oauth_id,oauth_type, email_fk) values ('108936834947616854132', 'google','thestinx@gmail.com');

insert into users (firstName, lastName, email) values ('user1', 'user1','user1@user1');
insert into localUsers (_id, pwd, email_fk) values (DEFAULT, 'user1', 'user1@user1');

select * from users inner join localUsers on email_fk = email;
select * from users inner join oauthUsers on email_fk = email;
select * from users inner join userIp on email_fk = email;





