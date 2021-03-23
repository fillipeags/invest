let brokers = [
  {
    id: '63579670000124',
    name: 'Rico Investimentos',
  },

  {
    id: '23031421000185',
    name: 'Easynvest',
  },
];

class BrokersRepository {
  findAll() {
    return new Promise((resolve) => resolve(brokers));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      brokers.find((broker) => broker.id === id),
    ));
  }

  create({
    name, id,
  }) {
    return new Promise((resolve) => {
      const newBroker = {
        id,
        name,
      };
      brokers.push(newBroker);
      resolve(newBroker);
    });
  }

  update(id, { name }) {
    return new Promise((resolve) => {
      const updatedBroker = {
        id, name,
      };

      brokers = brokers.map((broker) => (
        broker.id === id ? updatedBroker : broker
      ));

      resolve(updatedBroker);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      brokers = brokers.filter((broker) => broker.id !== id);

      resolve();
    });
  }
}

module.exports = new BrokersRepository();
