const router = require('express').Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
router.get('/', getSkills);
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);
module.exports = router;
