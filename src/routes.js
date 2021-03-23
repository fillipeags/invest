const { Router } = require('express');
const BrokerController = require('./app/controllers/BrokerController');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/brokers', BrokerController.index);
router.get('/brokers/:id', BrokerController.show);
router.post('/brokers', BrokerController.store);
router.put('/brokers/:id', BrokerController.update);
router.delete('/brokers/:id', BrokerController.delete);

module.exports = router;
