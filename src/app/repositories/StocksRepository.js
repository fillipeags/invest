let stocks = [
  {
    id: 'PETR4',
    name: 'Petrobras',
    field: 'Offshore',
    average_price: '10.24',
    total: '112',
  },
];

class StocksRepository {
  findAll() {
    return new Promise((resolve) => resolve(stocks));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      stocks.find((stock) => stock.id === id),
    ));
  }

  create({ id, name, field }) {
    return new Promise((resolve) => {
      const newStock = {
        id,
        name,
        field,
      };

      stocks.push(newStock);
      resolve(stocks);
    });
  }

  update(id, { name, field }) {
    return new Promise((resolve) => {
      const updatedStock = {
        id, name, field,
      };

      stocks = stocks.map((stock) => (
        stock.id === id ? updatedStock : stock
      ));

      resolve(updatedStock);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      stocks = stocks.filter((stock) => stock.id !== id);

      resolve();
    });
  }
}

module.exports = new StocksRepository();
