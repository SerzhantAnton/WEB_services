const Router = require('express');
const router = new Router;
const professorController  = require('../controllers/professor.controller');

router.post('/professor', professorController.createProfessor);
router.get('/professor', professorController.getProfessorsByDepartment);

module.exports = router;
