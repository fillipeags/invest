const db = require('../../database');

class TransactionsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM transactions ORDER BY date ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM transactions WHERE id = $1', [id]);
    return row;
  }

  async create({
    type, price, quantity, id_broker, id_company,
  }) {
    const [total] = await db.query(`
     SELECT total_stocks FROM companies WHERE id = $1
    `, [id_company]);

    if (type === 'sell' && total.total_stocks - quantity < 0) {
      return { error: 'Você não tem açoes suficientes para vender' };
    }

    const [totalStocks] = await db.query('SELECT SUM(total_stocks) FROM companies');
    console.log(totalStocks);
    console.log(total);
    const percentage = (100 * (total.total_stocks / totalStocks.sum));
    console.log(percentage);

    const [row] = await db.query(`
      INSERT INTO transactions (type, price , quantity, id_broker, id_company)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *

    `, [type, price, quantity, id_broker, id_company]);

    return row;
  }

  async update(id, {
    type, price, quantity,
  }) {
    const [row] = await db.query(`
      UPDATE transactions
      SET type = $1, price = $2, quantity = $3
      WHERE id = $4
      RETURNING *
    `, [type, price, quantity, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM transactions
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new TransactionsRepository();
