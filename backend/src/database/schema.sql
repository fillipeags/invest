CREATE DATABASE invest;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS brokers(
	id VARCHAR NOT NULL UNIQUE,
	name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS companies(
	id VARCHAR NOT NULL UNIQUE,
	name VARCHAR NOT NULL,
	field VARCHAR NOT NULL,
	stock_average_price DECIMAL DEFAULT 0,
	total_stocks INTEGER DEFAULT 0,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transactions (
	id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
	type VARCHAR NOT NULL CHECK(type IN('buy', 'sell')),
	date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	price DECIMAL NOT NULL,
	quantity INTEGER NOT NULL,
	id_company VARCHAR,
	id_broker VARCHAR,
	PRIMARY KEY (id),
	FOREIGN KEY(id_company) REFERENCES companies(id),
	FOREIGN KEY(id_broker) REFERENCES brokers(id)
	ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE OR REPLACE FUNCTION update_total_stocks()
RETURNS trigger
AS $$
	DECLARE qtd integer;
BEGIN
	SELECT total_stocks FROM companies
	WHERE id = NEW.id_company INTO qtd;

	UPDATE companies SET total_stocks = total_stocks + 5
		WHERE id = NEW.id_company;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_total_stocks
BEFORE INSERT ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_total_stocks();


DROP FUNCTION IF EXISTS update_total_stocks();

