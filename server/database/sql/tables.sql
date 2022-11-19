CREATE TABLE USERS (
  ID VARCHAR(255) NOT NULL,
  NAME VARCHAR(255) NOT NULL,
  AGE INT NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE DOCTORS (
  ID VARCHAR(255) NOT NULL,
  NAME VARCHAR(255) NOT NULL,
  RATINGS FLOAT DEFAULT 4.0,
  CATEGORY VARCHAR(255),
  AGE INT NOT NULL,
  AVAILABILITY BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (ID)
);

CREATE TABLE TREATMENTS (
  ID VARCHAR(255) NOT NULL,
  REPORT VARCHAR(255),
  DOCTOR VARCHAR(255) REFERENCES DOCTORS(ID),
  PATIENT VARCHAR(255) REFERENCES USERS(ID),
  SUMMARY VARCHAR(255),
  STATUS BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (ID)
);

CREATE TABLE PAYMENTS (
  ID VARCHAR(255) NOT NULL,
  TREATED_USER VARCHAR(255) NOT NULL REFERENCES USERS(ID),
  TREATMENT VARCHAR(255) NOT NULL REFERENCES TREATMENTS,
  PAYMENT_TIME DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (ID)
);
