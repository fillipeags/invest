const { Router } = require('express');

const BrokerController = require('./app/controllers/BrokerController');
const StockController = require('./app/controllers/StockController');
const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.get('/brokers', BrokerController.index);
router.get('/brokers/:id', BrokerController.show);
router.post('/brokers', BrokerController.store);
router.put('/brokers/:id', BrokerController.update);
router.delete('/brokers/:id', BrokerController.delete);

router.get('/stocks', StockController.index);
router.get('/stocks/:id', StockController.show);
router.post('/stocks', StockController.store);
router.put('/stocks/:id', StockController.update);
router.delete('/stocks/:id', StockController.delete);

module.exports = router;
