const db = require('../../database');

class BrokersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM brokers ORDER BY name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM brokers WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM brokers WHERE email = $1', [email]);
    return row;
  }

  async create({
    id, name,
  }) {
    const [row] = await db.query(`
      INSERT INTO brokers(id, name)
      VALUES($1,$2)
      RETURNING *
    `, [id, name]);

    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE brokers
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM brokers
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new BrokersRepository();
