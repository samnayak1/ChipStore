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




