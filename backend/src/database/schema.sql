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

CREATE FUNCTION conta_total(id VARCHAR)
RETURNS INTEGER READS SQL DATA
BEGIN
    DECLARE qtd INTEGER;
    SELECT SUM(quantity) INTO qtd
    FROM TRANSACTIONS
    WHERE id_company = id;
    RETURN coalesce(qtd, 0);
END$

CREATE FUNCTION update_total_stocks()
RETURNS TRIGGER AS $$
BEGIN
	DECLARE total_stocks_transactions INTEGER;
	SELECT conta_total(NEW.id_company) INTO total_stocks_transactions;
	IF (NEW.type = 'Buy') THEN
		UPDATE COMPANIES
		SET
		stock_average_price = ROUND(((stock_average_price * total_stocks_transactions) + (NEW.price * NEW.quantity)) / (total_stocks_transactions + NEW.quantity), 2),
		total_stocks = total_stocks + NEW.quantity
		WHERE id = NEW.id_company;
	ELSE
		UPDATE COMPANIES
		stock_average_price = ROUND(((stock_average_price * total_stocks_transactions) + (NEW.price * NEW.quantity)) / (total_stocks_transactions + NEW.quantity), 2),
		total_stocks = total_stocks - NEW.quantity
		WHERE id = NEW.id_company
END;
$$LANGUAGE plpgsql;


CREATE TRIGGER check_total_stocks
BEFORE INSERT OR UPDATE
ON TRANSACTION
FOR EACH ROW
EXECUTE PROCEDURE update_total_stocks()




DROP FUNCTION IF EXISTS update_total_stocks();

