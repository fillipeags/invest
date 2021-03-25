const BrokersRepository = require('../repositories/BrokersRepository');

class BrokerController {
  async index(request, response) {
    const { orderBy } = request.query;

    const brokers = await BrokersRepository.findAll(orderBy);

    response.json(brokers);
  }

  async show(request, response) {
    const { id } = request.params;

    const broker = await BrokersRepository.findById(id);

    if (!broker) {
      return response.status(404).json({ error: 'Broker not found' });
    }

    response.json(broker);
  }

  async store(request, response) {
    const { id, name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Broker is required' });
    }

    const brokerExists = await BrokersRepository.findById(id);

    if (brokerExists) {
      return response.status(400).json({ error: 'Broker already exists' });
    }

    const broker = await BrokersRepository.create({
      id, name,
    });

    response.json(broker);
  }

  async update(request, response) {
    const { id } = request.params;

    const { name } = request.body;

    const brokerExists = await BrokersRepository.findById(id);

    if (!brokerExists) {
      return response.status(404).json({ error: 'Broker not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const brokerCNPJ = await BrokersRepository.findById(id);

    if (brokerCNPJ && brokerCNPJ.id !== id) {
      return response.status(400).json({ error: 'CNPJ already in use' });
    }

    const broker = await BrokersRepository.update(id, { name });

    response.json(broker);
  }

  async delete(request, response) {
    const { id } = request.params;

    await BrokersRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new BrokerController();
