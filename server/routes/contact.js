const router = require('express').Router();
const { submitContact, getContacts } = require('../controllers/contactController');
router.post('/', submitContact);
router.get('/', getContacts);
module.exports = router;
