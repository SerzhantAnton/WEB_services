const Router = require('express');
const router  = new Router();
const departmentController = require('../controllers/department.controller');

router.post('/department', departmentController.creatDepartment);
router.get('/department', departmentController.getDepartments);
router.get('/department/:id', departmentController.getOneDepartment);
router.put('/department/', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;
