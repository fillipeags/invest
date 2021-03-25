const StocksRepository = require('../repositories/StocksRepository');

class StockController {
  async index(request, response) {
    const stocks = await StocksRepository.findAll();

    response.json(stocks);
  }

  async show(request, response) {
    const { id } = request.params;

    const stock = await StocksRepository.findById(id);

    if (!stock) {
      return response.status(404).json({ error: 'Stock not found' });
    }

    response.json(stock);
  }

  async store(request, response) {
    const { id, name, field } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!id) {
      return response.status(400).json({ error: 'Stock ID is required' });
    }

    if (!field) {
      return response.status(400).json({ error: 'Field not provided' });
    }

    const stockExists = await StocksRepository.findById(id);

    if (stockExists) {
      return response.status(400).json({ error: 'This stock is already on the system' });
    }

    const stock = await StocksRepository.create({ id, name, field });

    response.json(stock);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name, field } = request.body;

    const stockExists = await StocksRepository.findById(id);

    if (!stockExists) {
      return response.status(404).json({ error: 'Stock not found' });
    }

    const stock = await StocksRepository.update(id, { name, field });

    response.json(stock);
  }

  async delete(request, response) {
    const { id } = request.params;

    const stock = await StocksRepository.findById(id);

    if (!stock) {
      return response.status(404).json({ error: 'Stock not found' });
    }

    await StocksRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new StockController();
