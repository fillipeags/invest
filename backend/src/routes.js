const { Router } = require('express');

const BrokerController = require('./app/controllers/BrokerController');
const CompanyController = require('./app/controllers/CompanyController');

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

module.exports = router;
