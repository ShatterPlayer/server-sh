const router = require('express').Router();
const SiteController = require('../controllers/SiteController');
const AppController = require('../controllers/AppController');

router.get('/', SiteController.home);
router.post('/app',AppController.verifypass, AppController.store);

module.exports = router;