const { v4 } = require('uuid');
const db = require('../../database');

const today = new Date().toISOString().slice(0, 10);

let transactions = [
  {
    id: v4(),
    type: 'buy',
    date: today,
    price: 10.5,
    quantity: 10,
    id_broker: '44645092000132',
    id_company: 'PETR4',
  },

  {
    id: v4(),
    type: 'sell',
    date: today,
    price: 40.5,
    quantity: 20,
    id_broker: '44645092000132',
    id_company: 'PETR4',
  },

];

class TransactionsRepository {
  findAll() {
    return new Promise((resolve) => resolve(transactions));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      transactions.find((transaction) => transaction.id === id),
    ));
  }

  async create({
    type, price, quantity, id_broker, id_company,
  }) {
    const [row] = await db.query(`
      INSERT INTO transactions (type, price , quantity, id_broker, id_company)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *

    `, [type, price, quantity, id_broker, id_company]);

    return row;
  }

  update(id, {
    type, price, quantity, id_broker, id_company,
  }) {
    return new Promise((resolve) => {
      const updatedTransaction = {
        id,
        type,
        date: today,
        price,
        quantity,
        id_broker,
        id_company,
      };

      transactions = transactions.map((transaction) => (
        transaction.id === id ? updatedTransaction : transaction
      ));

      resolve(updatedTransaction);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      transactions = transactions.filter((transaction) => transaction.id !== id);
      resolve();
    });
  }
}

module.exports = new TransactionsRepository();
