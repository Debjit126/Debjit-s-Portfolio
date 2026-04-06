const router = require('express').Router();
const { getCertifications, createCertification, updateCertification, deleteCertification } = require('../controllers/certificationController');
router.get('/', getCertifications);
router.post('/', createCertification);
router.put('/:id', updateCertification);
router.delete('/:id', deleteCertification);
module.exports = router;
