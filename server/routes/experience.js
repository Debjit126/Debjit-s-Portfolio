const router = require('express').Router();
const { getExperience, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
router.get('/', getExperience);
router.post('/', createExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);
module.exports = router;
