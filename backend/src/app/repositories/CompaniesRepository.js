const db = require('../../database');

class CompaniesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM companies ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
    return row;
  }

  async create({
    id, name, field, stock_average_price, total_stocks,
  }) {
    const [row] = await db.query(`
      INSERT INTO companies (id, name, field, stock_average_price, total_stocks)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [id, name, field, stock_average_price, total_stocks]);

    return row;
  }

  async update(id, {
    name, field, stock_average_price, total_stocks,
  }) {
    const [row] = await db.query(`
      UPDATE companies
      SET name = $1, field = $2, stock_average_price = $3, total_stocks = $4
      WHERE id = $5
      RETURNING *
    `, [name, field, stock_average_price, total_stocks, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM companies
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new CompaniesRepository();
