const { v4 } = require('uuid');

const transactions = [
  {
    id: v4(),
    type: 'buy',
    date: Date.now(),
    price: 10.5,
    quantity: 10,
    id_broker: '44645092000132',
    id_company: 'PETR4',
  },

  {
    id: v4(),
    type: 'sell',
    date: Date.now(),
    price: 40.5,
    quantity: 20,
    id_broker: '44645092000132',
    id_company: 'PETR4',
  },
];

class TransactionsRepository {

}

module.exports = new TransactionsRepository();
