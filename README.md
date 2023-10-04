# ChipStore

###Running on your device
Install npm and PostgreSql database on a Debian based machine
> sudo apt install npm && postgresql
> head over to the "instructions.sql" file and paste the code into a psql terminal

> npm install
> npm start
In another terminal
> cd client
> node index.js
> set env variables on your operating system. These include database credentials DBUSER, DBPASSWORD, DBHOST, DBPORT, DBDATABASE and a random keyword JWTSECRET. or create a .env file to configure all variables.Also configure the email username, password and the type of service that the email belongs to. This email is the email that the One Time Password will be done from EMAILSERVICE, ETHERALEMAIL, ETHERALPASSWORD
.
The instructions.sql file
```
CREATE TABLE sellertable(
  seller_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  isActive Boolean NOT NULL,
  street VARCHAR(100) NOT NULL,
  pincode NUMERIC(5,2) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL 

);

CREATE TABLE producttable(
    product_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY ,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    priceafterdiscount NUMERIC(5,2) DEFAULT 0,
    discount NUMERIC(5,2) NOT NULL DEFAULT 0,
    seller_id uuid NOT NULL REFERENCES sellertable(seller_id),                      //
    category VARCHAR(50),
    created_time TIMESTAMP NOT NULL DEFAULT NOW(),
    available BOOLEAN NOT NULL
);


CREATE TABLE usertable(
  user_id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL, 
  email VARCHAR(100) NOT NULL UNIQUE,  
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  isActive Boolean NOT NULL,
  street VARCHAR(100) NOT NULL,
  pincode NUMERIC(5,2) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL 

);

CREATE TABLE visitedtable(
     user_id uuid REFERENCES usertable(user_id),
     product_id uuid REFERENCES producttable(product_id),
     time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE imagetable(
    imagename VARCHAR(50) NOT NULL,
    product_id uuid NOT NULL REFERENCES producttable(product_id)
);

CREATE TABLE buyingtable(
    user_id uuid REFERENCES usertable(user_id),
    product_id uuid REFERENCES producttable(product_id),
    quantity NUMERIC(5,0),
    time TIMESTAMP DEFAULT NOW()

);
CREATE TABLE sellingtable(
    user_id uuid REFERENCES usertable(user_id),
    product_id uuid REFERENCES producttable(product_id),
    quantity NUMERIC(5,0),
    time TIMESTAMP DEFAULT NOW()

);

CREATE TABLE otptable(
    email VARCHAR(50) NOT NULL UNIQUE,
    otp NUMERIC(6,0) NOT NULL
)
```
###About the project
 This is my first project that I have made. The project contains express routes with a Register/Login authentication, a database built with PostgreSQL and a bit of client side React work. The routes contain REST endpoints that provide functions to manage commercial activity.    
