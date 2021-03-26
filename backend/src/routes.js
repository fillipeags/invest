const { Router } = require('express');

const BrokerController = require('./app/controllers/BrokerController');
const CompanyController = require('./app/controllers/CompanyController');
const TransactionController = require('./app/controllers/TransactionController');

const router = Router();

router.get('/brokers', BrokerController.index);
router.get('/brokers/:id', BrokerController.show);
router.post('/brokers', BrokerController.store);
router.put('/brokers/:id', BrokerController.update);
router.delete('/brokers/:id', BrokerController.delete);

router.get('/companies', CompanyController.index);
router.get('/companies/:id', CompanyController.show);
router.post('/companies', CompanyController.store);
router.put('/companies/:id', CompanyController.update);
router.delete('/companies/:id', CompanyController.delete);

router.get('/transactions', TransactionController.index);
router.get('/transactions/:id', TransactionController.show);
router.post('/transactions', TransactionController.store);
router.put('/transactions/:id', TransactionController.update);
router.delete('/transactions/:id', TransactionController.delete);

module.exports = router;
