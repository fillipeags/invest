const TransactionsRepository = require('../repositories/TransactionsRepository');

class TransactionController {
  async index(request, response) {
    const transactions = await TransactionsRepository.findAll();
    response.json(transactions);
  }

  async show(request, response) {
    const { id } = request.params;

    const transaction = await TransactionsRepository.findById(id);

    if (!transaction) {
      return response.status(404).json({ erorr: 'Transaction not found' });
    }

    response.json(transaction);
  }

  async store(request, response) {
    const {
      type, price, quantity, id_broker, id_company,
    } = request.body;

    if (!type) {
      return response.status(404).json({ error: 'You Need to Buy or Sell' });
    }

    if (!price) {
      return response.status(404).json({ error: 'You Need to specify the price of the stock' });
    }

    if (!quantity) {
      return response.status(404).json({ error: 'You need to specify the amount of stocks' });
    }

    if (!id_broker) {
      return response.status(404).json({ error: 'You need to specify which broker you bought the stock' });
    }

    if (!id_company) {
      return response.status(404).json({ error: 'You need to specify which stock do you want' });
    }

    const transaction = await TransactionsRepository.create({
      type, price, quantity, id_broker, id_company,
    });

    response.json(transaction);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      type, price, quantity, id_broker, id_company,
    } = request.body;

    const transactionExists = await TransactionsRepository.findById(id);
    if (!transactionExists) {
      return response.status(404).json({ error: 'Transaction not found' });
    }

    if (!type) {
      return response.status(404).json({ error: 'Type is required' });
    }

    if (!price) {
      return response.status(404).json({ error: 'Price is required' });
    }

    if (!quantity) {
      return response.status(404).json({ error: 'Quantity is required' });
    }

    if (!id_broker) {
      return response.status(404).json({ error: 'Broker is required' });
    }

    if (!id_company) {
      return response.status(404).json({ error: 'Company is required' });
    }

    const transaction = await TransactionsRepository.update(id, {
      type, price, quantity, id_broker, id_company,
    });

    response.json(transaction);
  }

  async delete(request, response) {
    const { id } = request.params;

    const transaction = await TransactionsRepository.findById(id);

    if (!transaction) {
      return response.status(404).json({ error: 'Transaction not found' });
    }

    await TransactionsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new TransactionController();
